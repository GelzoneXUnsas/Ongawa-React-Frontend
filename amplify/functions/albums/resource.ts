import { defineFunction } from '@aws-amplify/backend';

export const albumsFunction = defineFunction({
  name: 'albums',
  entry: './handler.ts',
  environment: { TABLE_NAME: 'OngawaOneTable' },
});
