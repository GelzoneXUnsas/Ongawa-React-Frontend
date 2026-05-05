import { defineBackend } from '@aws-amplify/backend';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import {
  HttpApi,
  HttpMethod,
  CorsHttpMethod,
} from 'aws-cdk-lib/aws-apigatewayv2';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { HttpJwtAuthorizer } from 'aws-cdk-lib/aws-apigatewayv2-authorizers';
import { PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';
import { storage } from './storage/resource';
import { auth } from './auth/resource';
import { songsFunction } from './functions/songs/resource';
import { artistsFunction } from './functions/artists/resource';
import { albumsFunction } from './functions/albums/resource';
import { worldsFunction } from './functions/worlds/resource';
import { postsFunction } from './functions/posts/resource';
import { commentsFunction } from './functions/comments/resource';
import { usersFunction } from './functions/users/resource';

const backend = defineBackend({
  auth,
  storage,
  songsFunction,
  artistsFunction,
  albumsFunction,
  worldsFunction,
  postsFunction,
  commentsFunction,
  usersFunction,
});

// ── API Stack ─────────────────────────────────────────────────────────────────
const apiStack = backend.createStack('OngawaApiStack');

const { userPool, userPoolClient } = backend.auth.resources;

// JWT authorizer (validates Cognito tokens)
const jwtAuthorizer = new HttpJwtAuthorizer(
  'CognitoAuthorizer',
  `https://cognito-idp.us-west-1.amazonaws.com/${userPool.userPoolId}`,
  { jwtAudience: [userPoolClient.userPoolClientId] }
);

// HTTP API with CORS
const httpApi = new HttpApi(apiStack, 'OngawaHttpApi', {
  apiName: 'OngawaApi',
  corsPreflight: {
    allowOrigins: ['http://localhost:5173', 'https://ongawa.io', 'https://www.ongawa.io', 'https://dev.d3urzozmbnts00.amplifyapp.com'],
    allowMethods: [CorsHttpMethod.ANY],
    allowHeaders: ['Authorization', 'Content-Type'],
    allowCredentials: false,
  },
});

// ── Lambda integrations ───────────────────────────────────────────────────────
const songsIntegration = new HttpLambdaIntegration(
  'SongsIntegration',
  backend.songsFunction.resources.lambda
);
const artistsIntegration = new HttpLambdaIntegration(
  'ArtistsIntegration',
  backend.artistsFunction.resources.lambda
);
const albumsIntegration = new HttpLambdaIntegration(
  'AlbumsIntegration',
  backend.albumsFunction.resources.lambda
);
const worldsIntegration = new HttpLambdaIntegration(
  'WorldsIntegration',
  backend.worldsFunction.resources.lambda
);
const postsIntegration = new HttpLambdaIntegration(
  'PostsIntegration',
  backend.postsFunction.resources.lambda
);
const commentsIntegration = new HttpLambdaIntegration(
  'CommentsIntegration',
  backend.commentsFunction.resources.lambda
);
const usersIntegration = new HttpLambdaIntegration(
  'UsersIntegration',
  backend.usersFunction.resources.lambda
);

// ── Routes ────────────────────────────────────────────────────────────────────
// Songs (public reads, auth writes)
httpApi.addRoutes({ path: '/songs', methods: [HttpMethod.GET], integration: songsIntegration });
httpApi.addRoutes({ path: '/songs/{songId}', methods: [HttpMethod.GET], integration: songsIntegration });
httpApi.addRoutes({ path: '/songs/{songId}/beatmaps', methods: [HttpMethod.GET], integration: songsIntegration });
httpApi.addRoutes({ path: '/songs/{songId}/beatmaps/{beatmapId}', methods: [HttpMethod.GET], integration: songsIntegration });
httpApi.addRoutes({ path: '/songs/{songId}/beatmaps/{beatmapId}/leaderboard', methods: [HttpMethod.GET], integration: songsIntegration });
httpApi.addRoutes({ path: '/songs/{songId}/like', methods: [HttpMethod.POST], integration: songsIntegration, authorizer: jwtAuthorizer });
httpApi.addRoutes({ path: '/songs/{songId}/play', methods: [HttpMethod.POST], integration: songsIntegration, authorizer: jwtAuthorizer });

// Artists (public)
httpApi.addRoutes({ path: '/artists', methods: [HttpMethod.GET], integration: artistsIntegration });
httpApi.addRoutes({ path: '/artists/{artistId}', methods: [HttpMethod.GET], integration: artistsIntegration });
httpApi.addRoutes({ path: '/artists/{artistId}/songs', methods: [HttpMethod.GET], integration: artistsIntegration });
httpApi.addRoutes({ path: '/artists/{artistId}/albums', methods: [HttpMethod.GET], integration: artistsIntegration });

// Albums (public)
httpApi.addRoutes({ path: '/albums/{albumId}', methods: [HttpMethod.GET], integration: albumsIntegration });
httpApi.addRoutes({ path: '/albums/{albumId}/songs', methods: [HttpMethod.GET], integration: albumsIntegration });

// Worlds (public)
httpApi.addRoutes({ path: '/worlds', methods: [HttpMethod.GET], integration: worldsIntegration });
httpApi.addRoutes({ path: '/worlds/{worldId}', methods: [HttpMethod.GET], integration: worldsIntegration });

// Posts (public reads, auth writes)
httpApi.addRoutes({ path: '/posts', methods: [HttpMethod.GET], integration: postsIntegration });
httpApi.addRoutes({ path: '/posts/{postId}', methods: [HttpMethod.GET], integration: postsIntegration });
httpApi.addRoutes({ path: '/posts', methods: [HttpMethod.POST], integration: postsIntegration, authorizer: jwtAuthorizer });
httpApi.addRoutes({ path: '/posts/{postId}/like', methods: [HttpMethod.POST], integration: postsIntegration, authorizer: jwtAuthorizer });

// Comments (public reads, auth writes)
httpApi.addRoutes({ path: '/comments', methods: [HttpMethod.GET], integration: commentsIntegration });
httpApi.addRoutes({ path: '/comments', methods: [HttpMethod.POST], integration: commentsIntegration, authorizer: jwtAuthorizer });

// Users (auth required for all)
httpApi.addRoutes({ path: '/users/{userId}', methods: [HttpMethod.GET], integration: usersIntegration, authorizer: jwtAuthorizer });
httpApi.addRoutes({ path: '/users/{userId}/plays', methods: [HttpMethod.GET], integration: usersIntegration, authorizer: jwtAuthorizer });
httpApi.addRoutes({ path: '/users/{userId}/liked-songs', methods: [HttpMethod.GET], integration: usersIntegration, authorizer: jwtAuthorizer });
httpApi.addRoutes({ path: '/users/{userId}/liked-songs', methods: [HttpMethod.POST], integration: usersIntegration, authorizer: jwtAuthorizer });

// ── IAM: grant each Lambda access to OngawaOneTable ──────────────────────────
const table = Table.fromTableName(apiStack, 'OngawaOneTable', 'OngawaOneTable');
const tablePolicy = new PolicyStatement({
  effect: Effect.ALLOW,
  actions: [
    'dynamodb:GetItem',
    'dynamodb:Query',
    'dynamodb:PutItem',
    'dynamodb:UpdateItem',
    'dynamodb:BatchGetItem',
  ],
  resources: [table.tableArn, `${table.tableArn}/index/*`],
});

const lambdas = [
  backend.songsFunction,
  backend.artistsFunction,
  backend.albumsFunction,
  backend.worldsFunction,
  backend.postsFunction,
  backend.commentsFunction,
  backend.usersFunction,
];

for (const fn of lambdas) {
  fn.resources.lambda.addToRolePolicy(tablePolicy);
}

// ── Outputs ───────────────────────────────────────────────────────────────────
backend.addOutput({
  custom: {
    apiUrl: httpApi.apiEndpoint,
  },
});

export default backend;
