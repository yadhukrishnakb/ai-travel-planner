import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";


function Login(){

    const navigate = useNavigate();


    const [formData,setFormData] = useState({

        email:"",
        password:""

    });



    const handleChange = (e)=>{


        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });


    };




    const handleSubmit = async(e)=>{


        e.preventDefault();


        try{


            const response = await api.post(

                "/auth/login",

                formData

            );



            // store JWT token

            localStorage.setItem(

                "token",

                response.data.token

            );



            navigate("/dashboard");



        }catch(error){


            console.log(
                error.response.data
            );


        }


    };





    return (

        <div>


            <h1>
                Login
            </h1>



            <form onSubmit={handleSubmit}>


                <input

                type="email"

                name="email"

                placeholder="Email"

                value={formData.email}

                onChange={handleChange}

                />



                <input

                type="password"

                name="password"

                placeholder="Password"

                value={formData.password}

                onChange={handleChange}

                />



                <button type="submit">

                    Login

                </button>



            </form>



        </div>

    );

}



export default Login;