import { useState, useEffect } from "react";
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import React from "react";

const client = generateClient<Schema>();

/**
 *
 * Options
 * 1. add a GSI to the interactions table
 * 2. sort key? not sure if this is useful
 * 3. remove subreplies
 *
 *
 *
 *
 */

export default function PostList() {
    const [posts, setPosts] = useState<Schema["Post"]["type"][]>([]); // stores all posts
    const [postHeader, setPostHeader] = useState<string>(""); // current written post header
    const [postContent, setPostContent] = useState<string>(""); //  current written post content

    const [interactions, setInterations] = useState<
        Schema["Interaction"]["type"][]
    >([]); // stores all interations
    const [interactionsCond, setInterationsCond] = useState<
        Schema["Interaction"]["type"][]
    >([]); // stores all interations

    const [replyPostId, setReplyPostId] = useState<string | null>(null); // current responding post id -> allows us to reply to it
    const [replyContent, setReplyContent] = useState<string>(""); // content of reply to post

    const [focusedPostId, setFocusedPostId] = useState<string | null>(null); // current post being replied to

    const fetchPosts = async () => {
        const { data: items, errors } = await client.models.Post.list({});
        setPosts(items);
    };

    const fetchInteractionByParentId = async (parent_id: string) => {
        const { data: items, errors } = await client.models.Interaction.list({
            filter: {
                parent_id: {
                    eq: parent_id,
                },
            },
        });
        setInterationsCond(items);
    };

    const fetchInteractions = async () => {
        const { data: items, errors } = await client.models.Interaction.list(
            {}
        );
        setInterations(items);
    };

    useEffect(() => {
        fetchPosts();
        fetchInteractions();
        fetchInteractionByParentId("820ba58e-1d07-401a-84f9-e8f333f0ea2c");
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

    const createReply = async (
        parent_id: string,
        numReplies: number,
        type: "R" | "SR"
    ) => {
        if (!replyContent.trim()) return;

        await client.models.Interaction.create({
            user_id: "1", // need to fix this after cognito implementation
            parent_id: parent_id,
            post_id: "2",
            type: type,
            content: replyContent,
            id: Math.random().toString(),
        });

        if (type == "R") {
            await client.models.Post.update({
                id: parent_id,
                replies: numReplies + 1,
            });
        }

        setReplyContent("");
        setReplyPostId("");
        fetchInteractions();
        fetchPosts();
    };

    const Post = (post: Schema["Post"]["type"]) => {
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
                    </div>
                </div>
                <p>{post.content}</p>
                {replyPostId === post.id && Reply(post.replies ?? 0, "R")}
                {interactions
                    .filter((interaction) => interaction.parent_id === post.id)
                    .map((interation) => Interation(interation))}
            </div>
        );
    };

    const Interation = (interaction: Schema["Interaction"]["type"]) => {
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
                    {replyPostId === interaction.id && Reply(0, "SR")}
                    {interactions.filter(
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
                            .map((subi) => Interation(subi))}
                </div>
            </div>
        );
    };

    const Reply = (numReplies: number, type: "R" | "SR") => {
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
                <button
                    onClick={() =>
                        createReply(replyPostId ?? "", numReplies, type)
                    }
                >
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
