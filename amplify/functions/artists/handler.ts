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
    // GET /artists
    if (method === 'GET' && path === '/artists') {
      const result = await client.send(new QueryCommand({
        TableName: TABLE,
        IndexName: 'GSI1_EntityType',
        KeyConditionExpression: 'EntityType = :type',
        ExpressionAttributeValues: marshall({ ':type': 'Artist' }),
      }));
      return respond(200, (result.Items ?? []).map(item => unmarshall(item)));
    }

    // GET /artists/{artistId}
    if (method === 'GET' && params.artistId && path === `/artists/${params.artistId}`) {
      const result = await client.send(new GetItemCommand({
        TableName: TABLE,
        Key: marshall({ PK: `ARTIST#${params.artistId}`, SK: 'META' }),
      }));
      if (!result.Item) return respond(404, { error: 'Artist not found' });
      return respond(200, unmarshall(result.Item));
    }

    // GET /artists/{artistId}/songs
    if (method === 'GET' && params.artistId && path.endsWith('/songs')) {
      const result = await client.send(new QueryCommand({
        TableName: TABLE,
        IndexName: 'GSI2_ArtistSongs',
        KeyConditionExpression: 'ArtistID = :aid',
        ExpressionAttributeValues: marshall({ ':aid': Number(params.artistId) }),
        ScanIndexForward: false,
      }));
      return respond(200, (result.Items ?? []).map(item => unmarshall(item)));
    }

    // GET /artists/{artistId}/albums
    if (method === 'GET' && params.artistId && path.endsWith('/albums')) {
      const result = await client.send(new QueryCommand({
        TableName: TABLE,
        IndexName: 'GSI1_EntityType',
        KeyConditionExpression: 'EntityType = :type',
        FilterExpression: 'ArtistID = :aid',
        ExpressionAttributeValues: marshall({ ':type': 'Album', ':aid': Number(params.artistId) }),
      }));
      return respond(200, (result.Items ?? []).map(item => unmarshall(item)));
    }

    return respond(404, { error: 'Route not found' });
  } catch (err) {
    console.error(err);
    return respond(500, { error: 'Internal server error' });
  }
};
