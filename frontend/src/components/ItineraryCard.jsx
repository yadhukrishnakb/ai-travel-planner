function ItineraryCard({ itinerary }) {


    return (

        <div>

            <h2>
                Itinerary
            </h2>


            {
                itinerary && itinerary.length > 0 ? (

                    itinerary.map((day)=>(


                        <div key={day.dayNumber}>


                            <h3>
                                Day {day.dayNumber}
                            </h3>



                            {
                                day.activities.map((activity,index)=>(


                                    <div key={index}>


                                        <h4>
                                            {activity.title}
                                        </h4>


                                        <p>
                                            {activity.description}
                                        </p>


                                        <p>
                                            Time: {activity.timeOfDay}
                                        </p>


                                        <p>
                                            Cost: ${activity.estimatedCostUSD}
                                        </p>


                                    </div>


                                ))
                            }



                        </div>


                    ))


                ) : (

                    <p>
                        No itinerary available
                    </p>

                )

            }


        </div>

    );

}



export default ItineraryCard;