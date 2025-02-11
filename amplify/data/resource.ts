import { a, defineData, type ClientSchema } from "@aws-amplify/backend";

const schema = a.schema({
    Todo: a
        .model({
            content: a.string(),
            isDone: a.boolean(),
        })
        .authorization((allow) => [allow.publicApiKey()]),
    Posts: a
        .model({
            post_id: a.string(),
            user_id: a.string(),
            header: a.string(),
            content: a.string(),
            like_count: a.integer(),
            reply_count: a.integer(),
            timestamp: a.string(),
        })
        .authorization((allow) => [allow.publicApiKey()]),
    Interactions: a
        .model({
            post_id: a.string(),
            user_id: a.string(),
            type: a.enum(["like", "reply", "subreply"]),
            timestamp: a.string(),
            content: a.string(),
        })
        .authorization((allow) => [allow.publicApiKey()]),
});

// Used for code completion / highlighting when making requests from frontend
export type Schema = ClientSchema<typeof schema>;

// defines the data resource to be deployed
export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: "apiKey",
        apiKeyAuthorizationMode: { expiresInDays: 30 },
    },
});
