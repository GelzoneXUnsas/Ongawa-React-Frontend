import { defineFunction } from '@aws-amplify/backend';

export const postsFunction = defineFunction({
  name: 'posts',
  entry: './handler.ts',
  environment: { TABLE_NAME: 'OngawaOneTable' },
});
