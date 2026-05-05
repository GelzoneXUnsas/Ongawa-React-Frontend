import {
  DynamoDBClient,
  GetItemCommand,
  QueryCommand,
  PutItemCommand,
  UpdateItemCommand,
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
  const path = event.rawPath;
  const params = event.pathParameters ?? {};
  const claims = (event.requestContext as any).authorizer?.jwt?.claims ?? {};

  try {
    // GET /posts
    if (method === 'GET' && path === '/posts') {
      const result = await client.send(new QueryCommand({
        TableName: TABLE,
        IndexName: 'GSI1_EntityType',
        KeyConditionExpression: 'EntityType = :type',
        ExpressionAttributeValues: marshall({ ':type': 'Post' }),
        ScanIndexForward: false,
      }));
      return respond(200, (result.Items ?? []).map(item => unmarshall(item)));
    }

    // GET /posts/{postId}
    if (method === 'GET' && params.postId && path === `/posts/${params.postId}`) {
      const result = await client.send(new GetItemCommand({
        TableName: TABLE,
        Key: marshall({ PK: `POST#${params.postId}`, SK: 'META' }),
      }));
      if (!result.Item) return respond(404, { error: 'Post not found' });
      return respond(200, unmarshall(result.Item));
    }

    // POST /posts — requires auth
    if (method === 'POST' && path === '/posts') {
      if (!claims.sub) return respond(401, { error: 'Unauthorized' });
      const body = JSON.parse(event.body ?? '{}');
      const postId = Date.now().toString();
      const item = {
        PK: `POST#${postId}`,
        SK: 'META',
        EntityType: 'Post',
        UserID: claims.sub,
        AuthorName: claims['cognito:username'] ?? claims.email ?? 'Unknown',
        Title: body.title ?? '',
        Text: body.text ?? '',
        Tags: body.tags ?? [],
        MediaPointer: body.mediaPointer ?? null,
        Likes: 0,
        Views: 0,
        Date: new Date().toISOString(),
      };
      await client.send(new PutItemCommand({
        TableName: TABLE,
        Item: marshall(item, { removeUndefinedValues: true }),
      }));
      return respond(201, item);
    }

    // POST /posts/{postId}/like
    if (method === 'POST' && params.postId && path.endsWith('/like')) {
      if (!claims.sub) return respond(401, { error: 'Unauthorized' });
      await client.send(new UpdateItemCommand({
        TableName: TABLE,
        Key: marshall({ PK: `POST#${params.postId}`, SK: 'META' }),
        UpdateExpression: 'ADD Likes :inc',
        ExpressionAttributeValues: marshall({ ':inc': 1 }),
      }));
      return respond(200, { success: true });
    }

    return respond(404, { error: 'Route not found' });
  } catch (err) {
    console.error(err);
    return respond(500, { error: 'Internal server error' });
  }
};
