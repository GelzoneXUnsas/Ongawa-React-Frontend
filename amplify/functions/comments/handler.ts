import {
  DynamoDBClient,
  QueryCommand,
  PutItemCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';

const client = new DynamoDBClient({});
const TABLE = process.env.TABLE_NAME!;

const respond = (statusCode: number, body: unknown): APIGatewayProxyResultV2 => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const method = event.requestContext.http.method;
  const qs = event.queryStringParameters ?? {};
  const claims = (event.requestContext as any).authorizer?.jwt?.claims ?? {};

  try {
    // GET /comments?entity=SONG%23101%23BEATMAP%23501
    if (method === 'GET') {
      const entityPK = qs.entity;
      if (!entityPK) return respond(400, { error: 'Missing entity query param' });
      const result = await client.send(new QueryCommand({
        TableName: TABLE,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :prefix)',
        ExpressionAttributeValues: marshall({ ':pk': entityPK, ':prefix': 'COMMENT#' }),
      }));
      return respond(200, (result.Items ?? []).map(item => unmarshall(item)));
    }

    // POST /comments — requires auth
    if (method === 'POST') {
      if (!claims.sub) return respond(401, { error: 'Unauthorized' });
      const body = JSON.parse(event.body ?? '{}');
      const { entityPK, text, parentCommentId, threadParentId } = body;
      if (!entityPK || !text) return respond(400, { error: 'entityPK and text are required' });

      const ts = Date.now();
      const item = {
        PK: entityPK,
        SK: `COMMENT#${ts}#${claims.sub}`,
        EntityType: 'Comment',
        Text: text,
        AuthorID: claims.sub,
        AuthorName: claims['cognito:username'] ?? claims.email ?? 'Unknown',
        ParentCommentID: parentCommentId ?? null,
        ThreadParentID: threadParentId ?? null,
        Date: new Date(ts).toISOString(),
      };
      await client.send(new PutItemCommand({
        TableName: TABLE,
        Item: marshall(item, { removeUndefinedValues: true }),
      }));
      return respond(201, item);
    }

    return respond(404, { error: 'Route not found' });
  } catch (err) {
    console.error(err);
    return respond(500, { error: 'Internal server error' });
  }
};
