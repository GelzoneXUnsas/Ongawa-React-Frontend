import {
  DynamoDBClient,
  GetItemCommand,
  QueryCommand,
  BatchGetItemCommand,
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
    // GET /worlds
    if (method === 'GET' && path === '/worlds') {
      const result = await client.send(new QueryCommand({
        TableName: TABLE,
        IndexName: 'GSI1_EntityType',
        KeyConditionExpression: 'EntityType = :type',
        ExpressionAttributeValues: marshall({ ':type': 'World' }),
      }));
      return respond(200, (result.Items ?? []).map(item => unmarshall(item)));
    }

    // GET /worlds/{worldId}
    if (method === 'GET' && params.worldId) {
      const worldResult = await client.send(new GetItemCommand({
        TableName: TABLE,
        Key: marshall({ PK: `WORLD#${params.worldId}`, SK: 'META' }),
      }));
      if (!worldResult.Item) return respond(404, { error: 'World not found' });

      const world = unmarshall(worldResult.Item);
      const songIds: number[] = world.Songs ?? [];
      let songs: Record<string, unknown>[] = [];

      if (songIds.length > 0) {
        const batchResult = await client.send(new BatchGetItemCommand({
          RequestItems: {
            [TABLE]: {
              Keys: songIds.map(id => marshall({ PK: `SONG#${id}`, SK: 'META' })),
            },
          },
        }));
        songs = (batchResult.Responses?.[TABLE] ?? []).map(item => unmarshall(item)) as Record<string, unknown>[];
      }

      return respond(200, { ...world, discography: songs });
    }

    return respond(404, { error: 'Route not found' });
  } catch (err) {
    console.error(err);
    return respond(500, { error: 'Internal server error' });
  }
};
