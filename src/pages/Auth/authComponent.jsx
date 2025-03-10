import {
    Authenticator,
    createTheme,
    ThemeProvider,
} from "@aws-amplify/ui-react";

import React, { useState } from "react";

import "@aws-amplify/ui-react/styles.css";
//import "./auth.css";

import headerBackgroundImg from "../../assets/images/headerBackground.png";

const AuthComponent = () => {
    return (
        <div className="loginPage w-full bg-page-accent-gray overflow-hidden text-white text-body-overpass-base font-body-overpass">
            <div className="titleContainer relative h-60 z-0 overflow-hidden lg:h-72 mb-4">
                <div className="bgImgContainer w-full lg:-mt-64">
                    <img
                        src={headerBackgroundImg}
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
                                        user && console.log(user);
                                    }
                                    return (
                                        <div className="p-10 ">
                                            <h1 className="text-white text-center">
                                                Account Information
                                            </h1>
                                            <div className="text-white text-left pl-5 pt-3">
                                                <p>
                                                    Username:{" "}
                                                    {
                                                        user?.signInDetails.loginId.split(
                                                            "@"
                                                        )[0]
                                                    }
                                                </p>
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
