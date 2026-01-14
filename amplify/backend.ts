import { defineBackend } from '@aws-amplify/backend';
import { aws_dynamodb as ddb } from 'aws-cdk-lib';
import { storage } from './storage/resource';
import {auth} from './auth/resource'
import * as cognito from 'aws-cdk-lib/aws-cognito';

/**
 * Amplify Backend Definition
 * https://docs.amplify.aws/react/build-a-backend/
 */

const backend = defineBackend({
  storage,
  auth
});
export default backend;