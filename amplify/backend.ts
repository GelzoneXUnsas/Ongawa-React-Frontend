import { defineBackend } from '@aws-amplify/backend';
import { aws_dynamodb as ddb } from 'aws-cdk-lib';
import { storage } from './storage/resource';
import * as cognito from 'aws-cdk-lib/aws-cognito';

/**
 * Amplify Backend Definition
 * https://docs.amplify.aws/react/build-a-backend/
 */

const backend = defineBackend({
  storage
});
const authStack = backend.createStack('Auth');
export const userPool = cognito.UserPool.fromUserPoolId(
  authStack,
  'amplifyAuthUserPool4BA7F805-YEzxrTh19tTH',
  'us-west-1_iaex6nFAc' 
);

export const userPoolClient = cognito.UserPoolClient.fromUserPoolClientId(
  authStack,
  'Ongawa Website',
  'mmb8hq1q0i0c17engqdo8vo9u'
);
backend.addOutput({
  custom: {
    userPoolId: userPool.userPoolId,
    userPoolClientId: userPoolClient.userPoolClientId,
    region: 'us-west-1'
  }
});
// Create a new CDK stack for data resources
const dataStack = backend.createStack("DataStack");

// Define a DynamoDB single-table model
const gameDataTable = new ddb.Table(dataStack, "OngawaOneTable", {
  tableName: "OngawaOneTable", // optional but recommended
  partitionKey: { name: "PK", type: ddb.AttributeType.STRING },
  sortKey: { name: "SK", type: ddb.AttributeType.STRING },

  billingMode: ddb.BillingMode.PAY_PER_REQUEST, // on-demand billing
  encryption: ddb.TableEncryption.AWS_MANAGED,  // server-side encryption
});

export default backend;