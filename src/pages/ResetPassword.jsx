import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function ResetPassword(){

    const [password,setPassword]=useState("");

    const navigate=useNavigate();

    const resetPassword=async(e)=>{

        e.preventDefault();

        try{

            await api.post("/password/reset",{

                email:localStorage.getItem("resetEmail"),

                newPassword:password

            });

            alert("Password Reset Successfully");

            localStorage.removeItem("resetEmail");

            navigate("/login");

        }

        catch(error){

            alert(error.response?.data||"Reset Failed");

        }

    }

    return(

        <div className="container">

            <h2>Reset Password</h2>

            <form onSubmit={resetPassword}>

                <input

                    type="password"

                    placeholder="New Password"

                    value={password}

                    onChange={(e)=>setPassword(e.target.value)}

                    required

                />

                <button>

                    Reset Password

                </button>

            </form>

        </div>

    )

}

export default ResetPassword;