import { useState, useEffect, use } from "react";
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";

import {
    TurnedIn,
    TurnedInNot,
    ChatBubbleOutline,
    ExpandMore,
    ExpandLess,
    Delete,
} from "@mui/icons-material";

import { Reply } from "@mui/icons-material";
const ReplyIcon = Reply;

const client = generateClient<Schema>();

export default function PostList() {
    // store all posts on create
    const [posts, setPosts] = useState<Schema["communityPost"]["type"][]>([]); // stores all posts

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
        Schema["communityPost"]["type"] | null
    >(null);

    // useState for interactions whose post_id match the current focusedPostId
    // stored in a recursive tree form to efficiently render replies / subreplies
    const [interactionTree, setInteractionTree] = useState<
        Record<string, any[]>
    >({});
    const [replyCount, setReplyCount] = useState<number>(0);

    // current logged in user
    const { user } = useAuthenticator((context) => [context.user]);

    // current logged in user PULLED FROM DYNAMODB TABLE
    const [currUser, setCurrUser] = useState<Schema["userLike"]["type"][]>([]);

    useEffect(() => {
        if (user) {
            fetchUser(user.userId);
        }
    }, [user]);

    // API FUNCTIONS

    const fetchUser = async (user_id: string) => {
        const { data: items, errors } = await client.models.userLike.list({
            filter: {
                id: {
                    eq: user_id,
                },
            },
        });

        setCurrUser(items);
    };

    const fetchPosts = async () => {
        const { data: items, errors } = await client.models.communityPost.list(
            {}
        );
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
        const { data: items, errors } =
            await client.models.communityInteraction.list({
                filter: {
                    post_id: {
                        eq: post_id,
                    },
                },
            });

        setReplyCount(items.length);
        setInteractionTree(generateTree(items));
    };

    // const fetchLikedPostsByUserId = async (post_id: string) => {
    //     const { data: items, errors } =
    //         await client.models.userLike.list({
    //             filter: {
    //                 id: {
    //                     eq: user.userId,
    //                 },
    //             },
    //         });
    // };

    useEffect(() => {
        fetchPosts();
    }, []);

    const createPost = async () => {
        if (postHeader.trim() == "" || postContent.trim() == "") {
            alert("Please fill in all required fields.");
            return;
        }
        if (!user) {
            alert("Please sign in to create a post.");
            return;
        }

        await client.models.communityPost.create({
            user_id: user.userId, // need to fix this after cognito implementation
            header: postHeader,
            content: postContent,
            tags: Object.keys(selectedItems).filter(
                (key) => selectedItems[key]
            ),
        });

        setPostHeader("");
        setPostContent("");
        fetchPosts();
    };

    const likePost = async (pid: string, numLikes: number) => {
        if (!user) {
            alert("Please sign in to like a post.");
            return;
        }

        if (currUser[0]?.saved_posts?.includes(pid)) {
            await client.models.communityPost.update({
                id: pid,
                saves: numLikes - 1,
            });

            const { data: item, errors } = await client.models.userLike.list({
                filter: {
                    id: {
                        eq: user.userId,
                    },
                },
            });

            if (item.length > 0) {
                const updatedLikedPosts =
                    item[0].saved_posts?.filter((postId) => postId !== pid) ??
                    [];

                await client.models.userLike.update({
                    id: user.userId,
                    saved_posts: updatedLikedPosts, // Remove the post ID
                });
            }
        } else {
            await client.models.communityPost.update({
                id: pid,
                saves: numLikes + 1,
            });

            const { data: item, errors } = await client.models.userLike.list({
                filter: {
                    id: {
                        eq: user.userId,
                    },
                },
            });

            await client.models.userLike.update({
                id: user.userId,
                saved_posts: [...(item[0].saved_posts ?? []), pid],
            });
        }

        fetchPosts();
        fetchUser(user.userId);
    };

    const expandPost = async (post: Schema["communityPost"]["type"] | null) => {
        setReplyCount(-1);
        if (post === null) {
            setFocusedPost(null);
            return;
        }
        setFocusedPost(post);
        fetchInteractionByPostId(post.id ?? "");
    };

    const deleteInteraction = async (interactionId, userId) => {
        if (!user) return;
        if (userId !== user.userId) return;
        const { data: deletedTodo, errors } =
            await client.models.communityInteraction.delete({
                id: interactionId,
                post_id: focusedPost?.id ?? "",
            });

        fetchInteractionByPostId(focusedPost?.id ?? "");
    };

    // const deletePost = async (userId, postId) => {
    //     if (!user) return;
    //     if (userId !== user.userId) return;
    //     const { data: deletedTodo, errors } = await client.models.Post.delete({
    //         id: postId,
    //     });

    //     fetchPosts();
    // };

    const createReply = async (parent_id: string, type: "R" | "SR") => {
        if (!user) {
            alert("Please sign in to reply to a post.");
            return;
        }
        if (!replyContent.trim()) {
            alert("Please fill in all required fields.");
            return;
        }
        if (focusedPost === null) return;

        await client.models.communityInteraction.create({
            user_id: user.userId,
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

    const [selectedItems, setSelectedItems] = useState<{
        [key: string]: boolean;
    }>({
        Neon: false,
        Synthwave: false,
        Cyberpunk: false,
        Futuresynth: false,
        "Neon Bass": false,
    });

    const ChecklistForm = () => {
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setSelectedItems({
                ...selectedItems,
                [event.target.name]: event.target.checked,
            });
        };

        const handleSubmit = (event: React.FormEvent) => {
            event.preventDefault();
            console.log("Selected items:", selectedItems);
        };

        return (
            <form onSubmit={handleSubmit}>
                <div
                    style={{
                        display: "flex",
                        gap: "15px",
                    }}
                >
                    {Object.keys(selectedItems).map((item) => (
                        <label
                            key={item}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 15,
                                padding: 10,
                                color: "white",
                                backgroundColor: "rgba(199, 185, 235, 0.1)",
                                borderRadius: 5,
                                border: "none",
                            }}
                        >
                            <input
                                type="checkbox"
                                name={item}
                                checked={selectedItems[item]}
                                onChange={handleChange}
                            />
                            {item.replace("item", "Item ")}
                        </label>
                    ))}
                </div>
            </form>
        );
    };

    const Post = (post: Schema["communityPost"]["type"]) => {
        if (focusedPost !== null && post.id === focusedPost.id) {
            // active post
            return (
                <div
                    key={post.id}
                    style={{
                        padding: 40,
                        marginTop: 5,
                        display: "flex",
                        flexDirection: "column",
                        color: "white",
                        backgroundColor: "rgba(176, 154, 236, 0.1)",
                        borderRadius: 10,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 20,
                                alignItems: "center",
                            }}
                        >
                            <h1>{post.user_id.split("-")[0]}</h1>
                            <p>•</p>
                            <p>{post.createdAt?.split("T")[0]}</p>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                gap: 0,
                            }}
                        >
                            <button
                                style={{
                                    color: "white",
                                    backgroundColor: "transparent",
                                    borderRadius: 180,
                                    border: "none",
                                    height: 25,
                                    display: "flex",
                                    alignItems: "center",
                                    width: 0,
                                }}
                                onClick={() =>
                                    likePost(post.id ?? "", post.saves ?? 0)
                                }
                            >
                                {currUser[0]?.saved_posts?.includes(
                                    post.id ?? ""
                                ) && <TurnedIn />}
                                {!currUser[0]?.saved_posts?.includes(
                                    post.id ?? ""
                                ) && <TurnedInNot />}
                            </button>
                            <button
                                style={{
                                    color: "white",
                                    backgroundColor: "transparent",
                                    borderRadius: 180,
                                    border: "none",
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
                                <ChatBubbleOutline />
                            </button>
                            <button
                                style={{
                                    color: "white",
                                    backgroundColor: "transparent",
                                    borderRadius: 180,
                                    border: "none",
                                    height: 25,
                                    display: "flex",
                                    alignItems: "center",
                                    width: 0,
                                }}
                                onClick={() => {
                                    expandPost(null);
                                    setReplyPostId("");
                                }}
                            >
                                <ExpandLess />
                            </button>
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: 20 }}>
                        {post.tags?.map((tag) => (
                            <div
                                style={{
                                    backgroundColor: "rgba(205, 194, 235, 0.1)",
                                    borderRadius: 10,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    padding: 10,
                                }}
                            >
                                <b>{tag}</b>
                            </div>
                        ))}
                    </div>
                    <h4>{post.header}</h4>
                    <p>{post.content}</p>
                    <div
                        style={{
                            width: "100%",
                            height: 1,
                            border: "1px solid white",
                            margin: 10,
                            marginBottom: 30,
                        }}
                    />
                    {replyPostId === post.id && Reply("R")}
                    {interactionTree[post.id ?? 0]?.map((subReply) =>
                        Interaction(subReply, 0)
                    )}
                </div>
            );
        } else {
            return (
                <div
                    key={post.id}
                    style={{
                        padding: 40,
                        marginTop: 5,
                        display: "flex",
                        flexDirection: "column",
                        color: "white",
                        backgroundColor: "rgba(176, 154, 236, 0.1)",
                        borderRadius: 10,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 20,
                                alignItems: "center",
                            }}
                        >
                            <h1>{post.user_id.split("-")[0]}</h1>
                            <p>•</p>
                            <p>{post.createdAt?.split("T")[0]}</p>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                gap: 0,
                            }}
                        >
                            <button
                                style={{
                                    color: "white",
                                    backgroundColor: "transparent",
                                    borderRadius: 180,
                                    border: "none",
                                    height: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: 30,
                                    justifyContent: "center",
                                    width: 0,
                                }}
                                onClick={() =>
                                    likePost(post.id ?? "", post.saves ?? 0)
                                }
                            >
                                {currUser[0]?.saved_posts?.includes(
                                    post.id ?? ""
                                ) && <TurnedIn />}
                                {!currUser[0]?.saved_posts?.includes(
                                    post.id ?? ""
                                ) && <TurnedInNot />}
                            </button>
                            <button
                                style={{
                                    color: "white",
                                    backgroundColor: "transparent",
                                    borderRadius: 180,
                                    border: "none",
                                    height: 25,
                                    width: 0,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                                onClick={() => {
                                    expandPost(post);
                                }}
                            >
                                <ExpandMore />
                            </button>
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: 20 }}>
                        {post.tags?.map((tag) => (
                            <div
                                style={{
                                    backgroundColor: "rgba(205, 194, 235, 0.1)",
                                    borderRadius: 10,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    padding: 10,
                                }}
                            >
                                <b>{tag}</b>
                            </div>
                        ))}
                    </div>
                    <h4>{post.header}</h4>
                    <p>{post.content}</p>
                </div>
            );
        }
    };

    const Interaction = (
        interaction: Schema["communityInteraction"]["type"],
        margin: number
    ) => {
        return (
            <div
                style={{
                    color: "white",
                    marginLeft: margin,
                }}
                key={interaction.id}
            >
                <div
                    style={{
                        backgroundColor: "rgba(176, 154, 236, 0.1)",
                        borderRadius: 10,
                        padding: 10,
                        margin: 5,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                gap: 20,
                                alignItems: "center",
                            }}
                        >
                            <b style={{ fontSize: 20 }}>
                                {interaction.user_id.split("-")[0]}
                            </b>
                            {interaction.createdAt?.split("T")[0]}
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            {interaction.user_id === user?.userId && (
                                <button
                                    style={{
                                        color: "white",
                                        backgroundColor: "transparent",
                                        borderRadius: 180,
                                        height: 25,
                                        width: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        border: "none",
                                    }}
                                    onClick={() => {
                                        deleteInteraction(
                                            interaction.id,
                                            interaction.user_id
                                        );
                                    }}
                                >
                                    <Delete />
                                </button>
                            )}
                            <button
                                style={{
                                    color: "white",
                                    backgroundColor: "transparent",
                                    border: "none",
                                    height: 25,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 0,
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
                                <ReplyIcon />
                            </button>
                        </div>
                    </div>
                    <p style={{ paddingTop: 10 }}>{interaction.content}</p>
                    {replyPostId === interaction.id && Reply("SR")}
                    {interactionTree[interaction.id]?.map((subReply) =>
                        Interaction(subReply, 50)
                    )}
                </div>
            </div>
        );
    };

    const Reply = (type: "R" | "SR") => {
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "center",
                    gap: 20,
                }}
            >
                <input
                    type="text"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Reply to post..."
                    style={{
                        padding: 10,
                        color: "white",
                        height: "40px", // Adding a specific height to align with button
                    }}
                />
                <button
                    style={{
                        height: "40px", // Match the height of the input field
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center", // Ensure the button content is centered
                        borderRadius: 5,
                    }}
                    onClick={() => createReply(replyPostId ?? "", type)}
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
                <div
                    style={{
                        backgroundColor: "rgba(176, 154, 236, 0.1)",
                        marginBottom: 40,
                        borderRadius: 10,
                        padding: 40,
                    }}
                >
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
                                backgroundColor: "rgba(199, 185, 235, 0.1)",
                                border: "none",
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
                                backgroundColor: "rgba(199, 185, 235, 0.1)",
                                border: "none",
                            }}
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <ChecklistForm />
                        <button
                            style={{
                                height: 50,
                                marginTop: 13,
                                borderRadius: 5,
                            }}
                            onClick={createPost}
                        >
                            Add New Post
                        </button>
                    </div>
                </div>
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
