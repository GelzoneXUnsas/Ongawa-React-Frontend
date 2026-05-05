import {
  DynamoDBClient,
  GetItemCommand,
  QueryCommand,
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

  try {
    // GET /songs
    if (method === 'GET' && path === '/songs') {
      const result = await client.send(new QueryCommand({
        TableName: TABLE,
        IndexName: 'GSI1_EntityType',
        KeyConditionExpression: 'EntityType = :type',
        ExpressionAttributeValues: marshall({ ':type': 'Song' }),
      }));
      return respond(200, (result.Items ?? []).map(item => unmarshall(item)));
    }

    // GET /songs/{songId}
    if (method === 'GET' && params.songId && !path.includes('/beatmaps')) {
      const result = await client.send(new GetItemCommand({
        TableName: TABLE,
        Key: marshall({ PK: `SONG#${params.songId}`, SK: 'META' }),
      }));
      if (!result.Item) return respond(404, { error: 'Song not found' });
      return respond(200, unmarshall(result.Item));
    }

    // GET /songs/{songId}/beatmaps
    if (method === 'GET' && params.songId && path.endsWith('/beatmaps')) {
      const result = await client.send(new QueryCommand({
        TableName: TABLE,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :prefix)',
        ExpressionAttributeValues: marshall({ ':pk': `SONG#${params.songId}`, ':prefix': 'BEATMAP#' }),
      }));
      return respond(200, (result.Items ?? []).map(item => unmarshall(item)));
    }

    // GET /songs/{songId}/beatmaps/{beatmapId}
    if (method === 'GET' && params.songId && params.beatmapId && !path.includes('/leaderboard')) {
      const result = await client.send(new GetItemCommand({
        TableName: TABLE,
        Key: marshall({ PK: `SONG#${params.songId}`, SK: `BEATMAP#${params.beatmapId}` }),
      }));
      if (!result.Item) return respond(404, { error: 'Beatmap not found' });
      return respond(200, unmarshall(result.Item));
    }

    // GET /songs/{songId}/beatmaps/{beatmapId}/leaderboard
    if (method === 'GET' && params.songId && params.beatmapId && path.includes('/leaderboard')) {
      const result = await client.send(new QueryCommand({
        TableName: TABLE,
        IndexName: 'GSI3_BeatmapLeaderboard',
        KeyConditionExpression: 'BeatmapID = :bid',
        ExpressionAttributeValues: marshall({ ':bid': Number(params.beatmapId) }),
        ScanIndexForward: false,
        Limit: 50,
      }));
      return respond(200, (result.Items ?? []).map(item => unmarshall(item)));
    }

    // POST /songs/{songId}/like
    if (method === 'POST' && params.songId && path.endsWith('/like')) {
      await client.send(new UpdateItemCommand({
        TableName: TABLE,
        Key: marshall({ PK: `SONG#${params.songId}`, SK: 'META' }),
        UpdateExpression: 'ADD TotalLikes :inc',
        ExpressionAttributeValues: marshall({ ':inc': 1 }),
      }));
      return respond(200, { success: true });
    }

    // POST /songs/{songId}/play
    if (method === 'POST' && params.songId && path.endsWith('/play')) {
      await client.send(new UpdateItemCommand({
        TableName: TABLE,
        Key: marshall({ PK: `SONG#${params.songId}`, SK: 'META' }),
        UpdateExpression: 'ADD TotalPlays :inc',
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
