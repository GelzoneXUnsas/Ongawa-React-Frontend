import {
    Authenticator,
    createTheme,
    ThemeProvider,
} from "@aws-amplify/ui-react";
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

import React, { useState } from "react";

import "@aws-amplify/ui-react/styles.css";
import "./auth.css";

//import headerBackgroundImg from "../../assets/images/headerBackgroundImg.jpg";

const client = generateClient<Schema>();

const AuthComponent = () => {
    const [currUser, setCurrUser] = useState<Schema["userLike"]["type"][]>([]);
    const [hasFetched, setHasFetched] = useState<boolean>(false);

    const addUser = async (newUser) => {
        await client.models.userLike.create({
            id: newUser.userId,
        });
    };

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

    return (
        <div className="loginPage w-full bg-page-accent-gray overflow-hidden text-white text-body-overpass-base font-body-overpass">
            <div className="titleContainer relative h-60 z-0 overflow-hidden lg:h-72 mb-4">
                <div className="bgImgContainer w-full lg:-mt-64">
                    <img
                        //src={headerBackgroundImg}
                        className="headerBackgroundImg w-full relative object-cover"
                        alt=""
                    />
                </div>
                <div className="absolute w-full h-12 bottom-0 z-3 flex justify-center text-white text-center font-title-lexend text-4xl font-bold">
                    WELCOME!
                </div>
                <div className="gradientOverlay absolute bottom-0 w-full h-[70%] bg-gradient-overlay z-1"></div>
            </div>

            <div className="w-full flex justify-center pb-20 px-3">
                <div className="w-90 text-gray-600 space-y-5 shadow-2xl rounded-xs bg-login-gradient">
                    <div className="text-left mb-0">
                        <div className="mt-t">
                            <Authenticator socialProviders={["google"]}>
                                {({ signOut, user }) => {
                                    {
                                        user && addUser(user);
                                        user &&
                                            !hasFetched &&
                                            (setHasFetched(true),
                                            fetchUser(user.userId));
                                    }
                                    return (
                                        <div className="p-4 ">
                                            <h1 className="text-white text-center">
                                                Account Information
                                            </h1>
                                            <div className="text-white text-left p-3">
                                                <p>
                                                    Username:{" "}
                                                    {user?.signInDetails?.loginId?.split(
                                                        "@"
                                                    )[0] ?? "Unknown"}
                                                </p>
                                                <div>
                                                    liked posts:{" "}
                                                    <ul>
                                                        {currUser[0]?.saved_posts?.map(
                                                            (post) => (
                                                                <li key={post}>
                                                                    {post}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                                <div>
                                                    liked beat maps:{" "}
                                                    <ul>
                                                        {currUser[0]?.saved_bmaps?.map(
                                                            (post) => (
                                                                <li key={post}>
                                                                    {post}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                            <button
                                                className="mt-4 py-2 px-4 bg-lilac text-black rounded-lg text-sm font-medium border-none hover:border-none"
                                                onClick={signOut}
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    );
                                }}
                            </Authenticator>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthComponent;
