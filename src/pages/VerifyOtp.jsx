import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function VerifyOtp(){

    const [otp,setOtp]=useState("");

    const navigate=useNavigate();

    const verifyOtp=async(e)=>{

        e.preventDefault();

        try{

            await api.post("/password/verify",{

                email:localStorage.getItem("resetEmail"),

                otp

            });

            alert("OTP Verified");

            navigate("/reset-password");

        }

        catch(error){

            alert(error.response?.data||"Invalid OTP");

        }

    }

    return(

        <div className="container">

            <h2>Verify OTP</h2>

            <form onSubmit={verifyOtp}>

                <input

                    type="text"

                    placeholder="Enter OTP"

                    value={otp}

                    onChange={(e)=>setOtp(e.target.value)}

                    required

                />

                <button>

                    Verify OTP

                </button>

            </form>

        </div>

    )

}

export default VerifyOtp;