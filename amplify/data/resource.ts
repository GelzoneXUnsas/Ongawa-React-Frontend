import { a, defineData, type ClientSchema } from "@aws-amplify/backend";

const schema = a.schema({
    communityPost: a
        .model({
            id: a.id(),
            user_id: a.string().required(),
            header: a.string().required(),
            content: a.string().required(),
            saves: a.integer().default(0),
            replies: a.integer().default(0),
            tags: a.string().array(),
            createdAt: a.string(),
        })
        .authorization((allow) => [allow.publicApiKey()]),

    communityInteraction: a
        .model({
            id: a.id().required(),
            post_id: a.string().required(),
            parent_id: a.string().required(),
            user_id: a.string().required(),
            type: a.enum(["R", "SR"]), // reply, subreply (reply to a reply)
            content: a.string().required(),
        })
        .identifier(["post_id", "id"])
        .authorization((allow) => [allow.publicApiKey()]),

    beatmapInteration: a
        .model({
            id: a.id().required(),
            beatmap_id: a.string().required(),
            user_id: a.string().required(),
            content: a.string().required(),
        })
        .authorization((allow) => [allow.publicApiKey()]),

    userLike: a
        .model({
            id: a.string().required(),
            saved_posts: a.string().array(),
            saved_bmaps: a.string().array(),
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
