import { defineFunction } from '@aws-amplify/backend';

export const commentsFunction = defineFunction({
  name: 'comments',
  entry: './handler.ts',
  environment: { TABLE_NAME: 'OngawaOneTable' },
});
