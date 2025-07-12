import { useAuth } from '../../contexts/authContext';
import { login as loginApi } from './../../api/auth';
import { useEffect, useState } from 'react';
import { useLoading } from '../../contexts/loadingContext';
import { useNavigate } from 'react-router-dom';

interface Association {
    id: number;
    name: string;
}

const AuthLogic = () => {
    const { login } = useAuth();
    const [isReadyToLogin, setIsReadyToLogin] = useState<boolean>(false);
    const [token, setToken] = useState<string>("");
    const [sessionId, setSessionId] = useState<string>("");

    const nav = useNavigate();

    const { setLoadingStatus, loading } = useLoading();

    useEffect(() => {
        const queryString = window.location.search;
        const params = new URLSearchParams(queryString);
        const tokenFromUrl = params.get('token');
        const sessionIdFromUrl = params.get('session');

        if (tokenFromUrl && sessionIdFromUrl) {
            setToken(tokenFromUrl);
            setSessionId(sessionIdFromUrl);
        } else {
            nav("/login");
        }
    }, []);

    useEffect(() => {
        const loginF = async () => {
            if (!token || !sessionId) return;

            try {
                setLoadingStatus(true, false);
                const response = await loginApi(token, sessionId);
                if (response.error_code === '2.2.0.3') {
                    nav("/login?error=wrong-code");
                } else {
                    nav("/login?error=unknown-catch");
                }
            } catch (error) {
                nav("/login?error=unknown-catch");
            } finally {
                setLoadingStatus(false)
            }
        };

        loginF();
    }, [token, sessionId]);

    useEffect(() => {
        if (isReadyToLogin && association !== null) {
            login(token, sessionId, association);
        }
    }, [isReadyToLogin, association]);

    if (loading)
        return (<></>)

    return (
        <></>
    );
};

export default AuthLogic;