import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Post: a.customType({
    id: a.id().required(),
    Artist_name: a.string().required(),
    albumID: a.integer(),
    albumName: a.string(),
    albumNameUnicode: a.string(),
    ArtistUnicode: a.string(),
    beatmapLink: a.customType({
      approachRate: a.integer(),
      difficulty: a.string(),
      difficultyUnicode: a.string(),
      hp: a.integer(),
      noteCount: a.integer(),
      rating: a.integer(),
      sliderCount: a.integer()
    }),
    beatmap_artist: a.string(),
    bpm: a.integer(),
    description: a.string(),
    mp3Path: a.string(),
    releaseDate: a.string(),
    songCoverImg: a.string(),
    songDuration: a.integer(),
    Source: a.string(),
    Tags: a.string().array(),
    Title: a.string(),
    TitleUnicode: a.string(),
    Version: a.string(),
  }),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
