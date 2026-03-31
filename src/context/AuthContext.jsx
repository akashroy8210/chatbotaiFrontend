import { createContext, useReducer } from "react";

export const AuthContext = createContext()

const initialState = {
    token: localStorage.getItem("token") || null
}

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                token: action.payload
            }
        case "LOGOUT":
            return {
                token: null
            }
        default:
            return state
    }
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)
    const login = (token) => {
        localStorage.setItem("token", token)
        dispatch({ type: "LOGIN", payload: token })
    }

    const logout = () => {
        localStorage.removeItem("token")
        dispatch({ type: 'LOGOUT', })
    }
    return (
        <AuthContext.Provider value={{ state, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
} 
