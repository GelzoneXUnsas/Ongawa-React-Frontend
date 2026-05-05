import { defineFunction } from '@aws-amplify/backend';

export const artistsFunction = defineFunction({
  name: 'artists',
  entry: './handler.ts',
  environment: { TABLE_NAME: 'OngawaOneTable' },
});
