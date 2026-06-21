import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import api from "../utils/api";


import Navbar from "../components/Navbar";

import CreateTripForm from "../components/CreateTripForm";

import ItineraryCard from "../components/ItineraryCard";

import PackingList from "../components/PackingList";



function Dashboard(){


    const navigate = useNavigate();


    const [trips,setTrips] = useState([]);


    const [loading,setLoading] = useState(true);






    const fetchTrips = async()=>{


        const token = localStorage.getItem("token");



        if(!token){

            navigate("/login");

            return;

        }




        try{


            setLoading(true);



            const response = await api.get(

                "/trips",

                {

                    headers:{

                        Authorization:
                        `Bearer ${token}`

                    }

                }

            );



            setTrips(response.data);



        }catch(error){


            console.log(error);


        }finally{


            setLoading(false);


        }


    };






    const deleteTrip = async(id)=>{


        try{


            const token = localStorage.getItem("token");



            await api.delete(

                `/trips/${id}`,

                {

                    headers:{

                        Authorization:
                        `Bearer ${token}`

                    }

                }

            );



            fetchTrips();



        }catch(error){


            console.log(error);


        }


    };






    useEffect(()=>{


        fetchTrips();


    },[]);







    if(loading){


        return (

            <h2>
                Loading...
            </h2>

        );

    }






    return (

        <div>


            <Navbar />




            <CreateTripForm

                fetchTrips={fetchTrips}

            />





            <h2>
                Your Trips
            </h2>





            {

                trips.length === 0 ? (


                    <p>
                        No trips created yet
                    </p>


                ) : (



                    trips.map((trip)=>(


                        <div key={trip._id}>


                            <h2>
                                {trip.destination}
                            </h2>




                            <p>
                                Duration:
                                {trip.durationDays} days
                            </p>




                            <p>
                                Budget:
                                {trip.budgetTier}
                            </p>




                            <button

                            onClick={()=>
                                deleteTrip(trip._id)
                            }

                            >

                                Delete Trip

                            </button>





                            <ItineraryCard

                            itinerary={trip.itinerary}

                            />






                            <PackingList

                            packingList={trip.packingList}

                            tripId={trip._id}

                            fetchTrips={fetchTrips}

                            />





                        </div>


                    ))

                )

            }



        </div>

    );

}



export default Dashboard;