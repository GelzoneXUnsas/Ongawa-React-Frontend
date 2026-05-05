import { defineFunction } from '@aws-amplify/backend';

export const songsFunction = defineFunction({
  name: 'songs',
  entry: './handler.ts',
  environment: { TABLE_NAME: 'OngawaOneTable' },
});
