import { a, defineData, type ClientSchema } from "@aws-amplify/backend";

const schema = a.schema({
    Post: a
        .model({
            id: a.id(),
            user_id: a.string().required(),
            header: a.string().required(),
            content: a.string().required(),
            likes: a.integer().default(0),
            replies: a.integer().default(0),
        })
        .authorization((allow) => [allow.publicApiKey()]),

    Interaction: a
        .model({
            id: a.id().required(),
            post_id: a.string().required(),
            parent_id: a.string().required(),
            user_id: a.string().required(),
            type: a.enum(["L", "R", "SR"]), // like, reply, subreply (reply to a reply)
            content: a.string().required(),
        })
        .identifier(["post_id", "id"])
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
