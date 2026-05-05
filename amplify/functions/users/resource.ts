import { defineFunction } from '@aws-amplify/backend';

export const usersFunction = defineFunction({
  name: 'users',
  entry: './handler.ts',
  environment: { TABLE_NAME: 'OngawaOneTable' },
});
