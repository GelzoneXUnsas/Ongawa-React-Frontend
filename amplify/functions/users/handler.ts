import {
  DynamoDBClient,
  GetItemCommand,
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
  const path = event.rawPath;
  const params = event.pathParameters ?? {};
  const claims = (event.requestContext as any).authorizer?.jwt?.claims ?? {};

  try {
    // GET /users/{userId}
    if (method === 'GET' && params.userId && path === `/users/${params.userId}`) {
      const result = await client.send(new GetItemCommand({
        TableName: TABLE,
        Key: marshall({ PK: `USER#${params.userId}`, SK: 'PROFILE' }),
      }));
      if (!result.Item) return respond(404, { error: 'User not found' });
      return respond(200, unmarshall(result.Item));
    }

    // GET /users/{userId}/plays
    if (method === 'GET' && params.userId && path.endsWith('/plays')) {
      const result = await client.send(new QueryCommand({
        TableName: TABLE,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :prefix)',
        ExpressionAttributeValues: marshall({ ':pk': `USER#${params.userId}`, ':prefix': 'PLAY#' }),
      }));
      return respond(200, (result.Items ?? []).map(item => unmarshall(item)));
    }

    // GET /users/{userId}/liked-songs
    if (method === 'GET' && params.userId && path.endsWith('/liked-songs')) {
      const result = await client.send(new QueryCommand({
        TableName: TABLE,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :prefix)',
        ExpressionAttributeValues: marshall({ ':pk': `USER#${params.userId}`, ':prefix': 'LIKED#SONG#' }),
      }));
      return respond(200, (result.Items ?? []).map(item => unmarshall(item)));
    }

    // POST /users/{userId}/liked-songs — owner only
    if (method === 'POST' && params.userId && path.endsWith('/liked-songs')) {
      if (!claims.sub || claims.sub !== params.userId) {
        return respond(403, { error: 'Forbidden' });
      }
      const body = JSON.parse(event.body ?? '{}');
      const { songId } = body;
      if (!songId) return respond(400, { error: 'songId is required' });

      const item = {
        PK: `USER#${params.userId}`,
        SK: `LIKED#SONG#${songId}`,
        EntityType: 'LikedSong',
        SongID: Number(songId),
        LikedAt: new Date().toISOString(),
      };
      await client.send(new PutItemCommand({
        TableName: TABLE,
        Item: marshall(item),
      }));
      return respond(201, item);
    }

    return respond(404, { error: 'Route not found' });
  } catch (err) {
    console.error(err);
    return respond(500, { error: 'Internal server error' });
  }
};
