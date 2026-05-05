import { defineFunction } from '@aws-amplify/backend';

export const worldsFunction = defineFunction({
  name: 'worlds',
  entry: './handler.ts',
  environment: { TABLE_NAME: 'OngawaOneTable' },
});
