import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { GoogleLogin } from "@react-oauth/google";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        const params = new URLSearchParams(window.location.search);

        if (params.get("verified") === "true") {

            alert("✅ Email verified successfully. Please login.");

            window.history.replaceState({}, document.title, "/login");

        }

        if (params.get("verified") === "false") {

            alert("❌ Verification link is invalid or expired.");

            window.history.replaceState({}, document.title, "/login");

        }

    }, []);

    const login = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/auth/login", {
                username,
                password
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("userName", response.data.name);
            localStorage.setItem("userEmail", response.data.email);
            localStorage.setItem("role", response.data.role);

            alert("Login Successful");

            if (response.data.role === "ADMIN") {

                navigate("/admin");

            } else if (response.data.role === "WORKER") {

                navigate("/worker/dashboard");

            } else {

                navigate("/workers");

            }

        } catch (error) {

            alert(
                error.response?.data?.message ||
                error.response?.data ||
                "Invalid Email/Phone or Password"
            );

        }

    };

    return (

        <div className="container">

            <h2>Login</h2>


            <form onSubmit={login}>

                <input
                    type="text"
                    placeholder="Email or Phone Number"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <p
                    style={{
                        cursor: "pointer",
                        color: "blue",
                        textDecoration: "underline"
                    }}
                    onClick={() => navigate("/forgot-password")}
                >
                    Forgot Password?
                </p>

                <button type="submit">
                    Login
                </button>
                <hr />

<GoogleLogin
    onSuccess={async (credentialResponse) => {

        try {

            const response = await api.post("/auth/google", {

                token: credentialResponse.credential

            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);

            alert("Google Login Successful");

            if (response.data.role === "ADMIN") {

                navigate("/admin");

            } else if (response.data.role === "WORKER") {

                navigate("/worker/dashboard");

            } else {

                navigate("/workers");

            }

        } catch (err) {

            alert("Google Login Failed");

        }

    }}

    onError={() => {

        alert("Google Login Failed");

    }}
/>

            </form>

        </div>

    );

}

export default Login;