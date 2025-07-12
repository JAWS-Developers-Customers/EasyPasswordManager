import { useState, useEffect, useRef } from 'react';
import './AuthScreen.css';
import { login } from '../../api/auth';
//import { DASHBOARD_DEV_URL, DASHBOARD_PROD_URL, DASHBOARD_LOCAL_URL, INVITATION } from '../../config/config';
import autoAnimate from '@formkit/auto-animate';
import { useNotification } from '../../contexts/notificationContext';
import { useAuth } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { addNotification } = useNotification();
    document.title = "SimpleVote | Login";

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(false);
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);

    const auth = useAuth();
    const nav = useNavigate();
    const formAnimate = useRef(null);
    const loaderAnimate = useRef(null);

    useEffect(() => {
        formAnimate.current && autoAnimate(formAnimate.current, { "duration": 250, "easing": "ease-in-out" });
        loaderAnimate.current && autoAnimate(loaderAnimate.current, { "duration": 500, "easing": "ease-in-out" });
        setShowForm(true);
    }, [formAnimate, loaderAnimate])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setShowForm(false);
        setLoading(true);
        login(username, password).then(({ token, session }) => {
            switch (token.error_code) {
                case "1.3.0":
                    nav("/auth?token=" + token.data.token + "&session=" + session.data.session_id);
                    break;
                case "1.3.2.3":
                    addNotification("Error", "Invalid email or password", "error");
                    setShowForm(true); // Rendi di nuovo visibili gli input
                    setLoading(false);
                    break;
                case "1.3.2.4":
                    addNotification("Error", "This user was disabled by an administrator", "error");
                    setShowForm(true); // Rendi di nuovo visibili gli input
                    setLoading(false);
                    break;
                default:
                    addNotification("Error", "An error occurred", "error");
                    setShowForm(true); // Rendi di nuovo visibili gli input
                    setLoading(false);
                    break;
            }
        });
    };

    return (
        <>
            <div className="container" ref={formAnimate}>
                {showForm &&
                    <div className="box">
                        {/*<img src="https://assets.simplevote.ch/icon.png" alt="Logo" className="logo" />*/}
                        <h2 className="heading">Login</h2>
                        <form className={`form`} onSubmit={handleSubmit}>
                            <input type="text" placeholder="Username" required className="input" onChange={(event) => setUsername(event.target.value)} />
                            <input type="password" placeholder="Password" required className="input" onChange={(event) => setPassword(event.target.value)} />
                            <button type="submit" className='button' disabled={loading}>Sign In</button>
                        </form>
                    </div>
                }
            </div>
            <div className='loaderWrapper'>
                <div ref={loaderAnimate}>
                    {loading && <div className="loader"></div>}
                </div>
            </div>
        </>
    );
};

export default Login;