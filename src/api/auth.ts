import { APIQuery } from "./api.base";
import { APIResponse, EMPTY_CRED } from "../types/api.types";
import { getSession } from "./session";
import { CONFIG } from "../config/config";

export const login = async (username: string, password: string) => {
    const jonathan = await getSession();
    const response = await fetch(`${CONFIG.API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-session-id': jonathan.data
        },
        body: JSON.stringify({ "username": username, "password": password })
    });
    const responseB = await response.json();
    return { "token": responseB, "session": jonathan.data };
}

export const verifyToken = async (token: string, session: string): Promise<APIResponse> => {
    return await APIQuery({ token: token, session_id: session }, '/user/get/me', 'GET', []);
};

export const logout = async (auth: { token: string, session_id: string }): Promise<APIResponse> => {
    return await APIQuery(auth, '/auth/logout/', 'GET', []);
};