import { createContext, useContext, useState } from "react";



const AuthContext = createContext()

export default function AuthProvider({children}){
    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState(null)

    const value = {
        user, setUser,
        accessToken, setAccessToken
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider")
    }

    return context
}