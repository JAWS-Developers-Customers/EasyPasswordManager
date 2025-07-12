import { CONFIG } from "../config/config";

export const getSession = async () => {
    const sessionFound = await window.localStorage.getItem("session_id");
    console.log(sessionFound);

    if (sessionFound)
        return { data: sessionFound };

    const response = await fetch(`${CONFIG.API_URL}/get-session-id-for-auth`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const session = await response.json();
    window.localStorage.setItem("session_id", session.data);
    return session;
}