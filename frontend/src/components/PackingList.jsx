import api from "../utils/api";


function PackingList({ packingList, tripId, fetchTrips }) {



    const togglePacked = async(index)=>{


        try{


            const updatedList = packingList.map((item,i)=>{


                if(i === index){

                    return {

                        ...item,

                        isPacked: !item.isPacked

                    };

                }


                return item;


            });





            const token = localStorage.getItem("token");




            await api.put(

                `/trips/${tripId}`,

                {

                    packingList: updatedList

                },

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





    return (

        <div>


            <h2>
                AI Packing List
            </h2>




            {

                packingList && packingList.length > 0 ? (


                    packingList.map((item,index)=>(


                        <div key={index}>


                            <input

                            type="checkbox"

                            checked={item.isPacked}

                            onChange={() => togglePacked(index)}

                            />



                            <span>

                                {item.item}

                            </span>



                            <span>

                                {" "}({item.category})

                            </span>



                        </div>


                    ))


                ) : (


                    <p>
                        No packing list available
                    </p>


                )

            }



        </div>

    );

}



export default PackingList;