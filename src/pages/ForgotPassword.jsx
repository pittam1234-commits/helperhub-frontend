import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function ForgotPassword() {

    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const sendOtp = async (e) => {

        e.preventDefault();

        try {

            await api.post("/password/forgot", {
                email
            });

            alert("OTP Sent Successfully");

            localStorage.setItem("resetEmail", email);

            navigate("/verify-otp");

        } catch (error) {

            alert(
                error.response?.data ||
                "Failed to send OTP"
            );

        }

    };

    return (

        <div className="container">

            <h2>Forgot Password</h2>

            <form onSubmit={sendOtp}>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                />

                <button type="submit">

                    Send OTP

                </button>

            </form>

        </div>

    );

}

export default ForgotPassword;