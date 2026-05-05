import {
  DynamoDBClient,
  GetItemCommand,
  QueryCommand,
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

  try {
    // GET /albums/{albumId}
    if (method === 'GET' && params.albumId && path === `/albums/${params.albumId}`) {
      const result = await client.send(new GetItemCommand({
        TableName: TABLE,
        Key: marshall({ PK: `ALBUM#${params.albumId}`, SK: 'META' }),
      }));
      if (!result.Item) return respond(404, { error: 'Album not found' });
      return respond(200, unmarshall(result.Item));
    }

    // GET /albums/{albumId}/songs
    if (method === 'GET' && params.albumId && path.endsWith('/songs')) {
      const result = await client.send(new QueryCommand({
        TableName: TABLE,
        IndexName: 'GSI4_AlbumID',
        KeyConditionExpression: 'AlbumID = :aid',
        ExpressionAttributeValues: marshall({ ':aid': Number(params.albumId) }),
      }));
      return respond(200, (result.Items ?? []).map(item => unmarshall(item)));
    }

    return respond(404, { error: 'Route not found' });
  } catch (err) {
    console.error(err);
    return respond(500, { error: 'Internal server error' });
  }
};
