import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";


function Register(){

    const navigate = useNavigate();


    const [formData,setFormData] = useState({

        name:"",
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
                "/auth/register",
                formData
            );


            console.log(response.data);


            navigate("/login");


        }catch(error){


            console.log(error.response.data);


        }


    };




    return (

        <div>


            <h1>
                Register
            </h1>



            <form onSubmit={handleSubmit}>


                <input

                type="text"

                name="name"

                placeholder="Name"

                value={formData.name}

                onChange={handleChange}

                />



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

                    Register

                </button>



            </form>


        </div>

    );

}



export default Register;