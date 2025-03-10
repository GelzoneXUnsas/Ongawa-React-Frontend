import { useState, useEffect } from "react";
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import React from "react";

const client = generateClient<Schema>();

/* TODO
 *  add tree like structure for interactions
 *      will these be better? generating whole tree
 *
 */

export default function PostList() {
    // store all posts on create
    const [posts, setPosts] = useState<Schema["Post"]["type"][]>([]); // stores all posts

    // useState for creating a new post -> stores header and content fields
    const [postHeader, setPostHeader] = useState<string>("");
    const [postContent, setPostContent] = useState<string>("");

    // useState for replying to a new post -> stores id of post/reply we are replying and reply content
    const [replyPostId, setReplyPostId] = useState<string | null>(null);
    const [replyContent, setReplyContent] = useState<string>("");

    // useState for the current post we are looking at
    // needed to manage which post we need to fetch interactions for
    // needed to manage which post we are replying to
    const [focusedPost, setFocusedPost] = useState<
        Schema["Post"]["type"] | null
    >(null);

    // useState for interactions whose post_id match the current focusedPostId
    // stored in a recursive tree form to efficiently render replies / subreplies
    const [interactionTree, setInteractionTree] = useState<
        Record<string, any[]>
    >({});

    // API FUNCTIONS

    const fetchPosts = async () => {
        const { data: items, errors } = await client.models.Post.list({});
        setPosts(items);
    };

    const generateTree = (replies: any) => {
        const tree: Record<string, any[]> = {};

        replies.forEach((reply) => {
            if (!tree[reply.parent_id]) {
                tree[reply.parent_id] = [];
            }
            tree[reply.parent_id].push(reply);
        });

        replies.forEach((reply) => {
            if (tree[reply.id]) {
                reply.replies = tree[reply.id];
            }
        });

        return tree;
    };

    const fetchInteractionByPostId = async (post_id: string) => {
        const { data: items, errors } = await client.models.Interaction.list({
            filter: {
                post_id: {
                    eq: post_id,
                },
            },
        });

        setInteractionTree(generateTree(items));
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const createPost = async () => {
        if (postHeader.trim() == "" || postContent.trim() == "") return;

        await client.models.Post.create({
            user_id: "1", // need to fix this after cognito implementation
            header: postHeader,
            content: postContent,
        });

        setPostHeader("");
        setPostContent("");
        fetchPosts();
    };

    // need to change logic so each user can only like each post once -> talk to l/p about how we want to deal with likes long term
    const likePost = async (pid: string, numLikes: number) => {
        await client.models.Post.update({
            id: pid,
            likes: numLikes + 1,
        });

        fetchPosts();
    };

    const expandPost = async (post: Schema["Post"]["type"] | null) => {
        if (post === null) {
            setFocusedPost(null);
            return;
        }
        setFocusedPost(post);
        fetchInteractionByPostId(post.id ?? "");
    };

    const createReply = async (parent_id: string, type: "R" | "SR") => {
        if (!replyContent.trim()) return;
        if (focusedPost === null) return;

        await client.models.Interaction.create({
            user_id: "1", // need to fix this after cognito implementation
            parent_id: parent_id,
            post_id: focusedPost.id ?? "",
            type: type,
            content: replyContent,
            id: Math.random().toString(),
        });

        setReplyContent("");
        setReplyPostId("");
        fetchPosts();
        fetchInteractionByPostId(focusedPost.id ?? "");
    };

    const Post = (post: Schema["Post"]["type"]) => {
        if (focusedPost !== null && post.id === focusedPost.id) {
            return (
                <div
                    key={post.id}
                    style={{
                        border: "2px solid white",
                        padding: 5,
                        marginTop: 5,
                        display: "flex",
                        flexDirection: "column",
                        color: "white",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <h1>{post.header}</h1>
                        <div
                            style={{
                                display: "flex",
                                gap: 10,
                            }}
                        >
                            <button
                                style={{
                                    color: "red",
                                    backgroundColor: "transparent",
                                    borderRadius: 180,
                                    border: "2px solid white",
                                    height: 25,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                                onClick={() =>
                                    likePost(post.id ?? "", post.likes ?? 0)
                                }
                            >
                                {post.likes} ♡
                            </button>
                            <button
                                style={{
                                    color: "white",
                                    backgroundColor: "transparent",
                                    borderRadius: 180,
                                    border: "2px solid white",
                                    height: 25,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                                onClick={() => {
                                    if (replyPostId === post.id) {
                                        setReplyPostId("-1");
                                    } else {
                                        setReplyContent("");
                                        setReplyPostId(post.id ?? null);
                                    }
                                }}
                            >
                                {post.replies} REPLY
                            </button>
                            <button
                                style={{
                                    color: "white",
                                    backgroundColor: "transparent",
                                    borderRadius: 180,
                                    border: "2px solid white",
                                    height: 25,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                                onClick={() => {
                                    expandPost(null);
                                }}
                            >
                                HIDE
                            </button>
                        </div>
                    </div>
                    <p>{post.content}</p>
                    {replyPostId === post.id && Reply("R")}
                    {/* {interactions
                        .filter(
                            (interaction) => interaction.parent_id === post.id
                        )
                        .map((interation) => Interaction(interation))} */}
                    {interactionTree[post.id ?? 0]?.map((subReply) =>
                        Interaction(subReply)
                    )}
                </div>
            );
        } else {
            return (
                <div
                    key={post.id}
                    style={{
                        border: "2px solid white",
                        padding: 5,
                        marginTop: 5,
                        display: "flex",
                        flexDirection: "column",
                        color: "white",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <h1>{post.header}</h1>
                        <div
                            style={{
                                display: "flex",
                                gap: 10,
                            }}
                        >
                            <button
                                style={{
                                    color: "white",
                                    backgroundColor: "transparent",
                                    borderRadius: 180,
                                    border: "2px solid white",
                                    height: 25,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                                onClick={() => {
                                    expandPost(post);
                                }}
                            >
                                EXPAND
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
    };

    const Interaction = (interaction: Schema["Interaction"]["type"]) => {
        return (
            <div
                style={{
                    color: "white",
                    marginLeft: 50,
                }}
                key={interaction.id}
            >
                <div
                    style={{
                        border: "2px solid white",
                        padding: 5,
                        margin: 5,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <p>{interaction.content}</p>
                        <button
                            style={{
                                color:
                                    replyPostId === interaction.id
                                        ? "green"
                                        : "white",
                                backgroundColor: "transparent",
                                borderRadius: 180,
                                border:
                                    replyPostId === interaction.id
                                        ? "2px solid green"
                                        : "2px solid white",
                                height: 25,
                                display: "flex",
                                alignItems: "center",
                            }}
                            onClick={() => {
                                if (replyPostId === interaction.id) {
                                    setReplyPostId("-1");
                                } else {
                                    setReplyContent("");
                                    setReplyPostId(interaction.id ?? null);
                                }
                            }}
                        >
                            REPLY
                        </button>
                    </div>
                    {replyPostId === interaction.id && Reply("SR")}
                    {/* {interactions.filter(
                        (subi) =>
                            subi.type === "SR" &&
                            subi.parent_id === interaction.id
                    ) &&
                        interactions
                            .filter(
                                (subi) =>
                                    subi.type === "SR" &&
                                    subi.parent_id === interaction.id
                            )
                            .map((subi) => Interation(subi))} */}
                    {interactionTree[interaction.id]?.map((subReply) =>
                        Interaction(subReply)
                    )}
                </div>
            </div>
        );
    };

    const Reply = (type: "R" | "SR") => {
        return (
            <div
                style={{
                    border: "2px solid green",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 5,
                    gap: 5,
                }}
            >
                <input
                    type="text"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Reply to post..."
                    style={{
                        padding: 10,
                        marginBottom: 10,
                        color: "white",
                    }}
                />
                <button onClick={() => createReply(replyPostId ?? "", type)}>
                    Reply
                </button>
            </div>
        );
    };

    return (
        <div style={{ margin: 100 }}>
            <h1 style={{ color: "white" }}>
                <strong>Community Page</strong>
            </h1>
            <div>
                <div>
                    <input
                        type="text"
                        value={postHeader}
                        onChange={(e) => setPostHeader(e.target.value)}
                        placeholder="Post header..."
                        style={{
                            padding: 10,
                            marginBottom: 10,
                            display: "block",
                            color: "white",
                        }}
                    />
                    <input
                        type="text"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        placeholder="Post content..."
                        style={{
                            padding: 10,
                            marginBottom: 10,
                            display: "block",
                            color: "white",
                        }}
                    />
                </div>
                <button onClick={createPost} style={{ marginBottom: 50 }}>
                    Add new Post
                </button>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 50,
                    }}
                >
                    {posts.map((post) => Post(post))}
                </div>
            </div>
        </div>
    );
}
