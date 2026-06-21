import { useState } from "react";
import api from "../utils/api";


function CreateTripForm({ fetchTrips }) {


    const [loading,setLoading] = useState(false);

    const [error,setError] = useState("");



    const [trip,setTrip] = useState({

        destination:"",
        durationDays:"",
        budgetTier:"Medium",
        interests:""

    });




    const handleChange = (e)=>{

        setTrip({

            ...trip,

            [e.target.name]:e.target.value

        });

    };





    const handleSubmit = async(e)=>{


        e.preventDefault();


        try{


            setLoading(true);

            setError("");



            const token = localStorage.getItem("token");



            await api.post(

                "/trips",

                {

                    destination:trip.destination,

                    durationDays:Number(trip.durationDays),

                    budgetTier:trip.budgetTier,

                    interests:
                    trip.interests.split(",")

                },

                {

                    headers:{

                        Authorization:
                        `Bearer ${token}`

                    }

                }

            );



            setTrip({

                destination:"",

                durationDays:"",

                budgetTier:"Medium",

                interests:""

            });



            fetchTrips();



        }catch(error){


            setError(
                "Failed to create trip"
            );


        }finally{


            setLoading(false);


        }


    };





    return (

        <form onSubmit={handleSubmit}>


            {
                error && (

                    <p>
                        {error}
                    </p>

                )
            }




            <input

            name="destination"

            placeholder="Destination"

            value={trip.destination}

            onChange={handleChange}

            />




            <input

            name="durationDays"

            type="number"

            placeholder="Days"

            value={trip.durationDays}

            onChange={handleChange}

            />




            <select

            name="budgetTier"

            value={trip.budgetTier}

            onChange={handleChange}

            >

                <option>
                    Low
                </option>


                <option>
                    Medium
                </option>


                <option>
                    High
                </option>


            </select>




            <input

            name="interests"

            placeholder="Food,Culture,Adventure"

            value={trip.interests}

            onChange={handleChange}

            />




            <button disabled={loading}>

                {
                    loading 
                    ? "Generating..."
                    : "Generate Trip"
                }

            </button>



        </form>

    );

}


export default CreateTripForm;