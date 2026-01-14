/* eslint-disable no-undef */
/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useEffect, useState } from "react"
import { getCurrentUser } from 'aws-amplify/auth'
import { Hub } from 'aws-amplify/utils'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
    const [currUser, setCurrUser] = useState(null)
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check initial auth state
        checkUser()

        // Listen for auth events (sign in, sign out, token refresh)
        const hubListener = Hub.listen('auth', ({ payload }) => {
            switch (payload.event) {
                case 'signedIn':
                    console.log('User signed in')
                    checkUser()
                    break
                case 'signedOut':
                    console.log('User signed out')
                    setCurrUser(null)
                    setUserLoggedIn(false)
                    break
                case 'tokenRefresh':
                    console.log('Token refreshed')
                    checkUser()
                    break
                case 'signInWithRedirect':
                    console.log('User signed in with redirect')
                    checkUser()
                    break
                case 'signInWithRedirect_failure':
                    console.error('Sign in with redirect failed', payload.data)
                    break
            }
        })

        // Cleanup listener on unmount
        return () => hubListener()
    }, [])

    async function checkUser() {
        try {
            const user = await getCurrentUser()
            
            if (user) {
                setCurrUser(user)
                setUserLoggedIn(true)
            } else {
                setCurrUser(null)
                setUserLoggedIn(false)
            }
        } catch (error) {
            // User is not authenticated
            setCurrUser(null)
            setUserLoggedIn(false)
        } finally {
            setLoading(false)
        }
    }

    const value = {
        currUser,
        userLoggedIn,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}