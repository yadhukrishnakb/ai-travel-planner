const Trip = require("../models/Trip");

const { GoogleGenerativeAI } = require("@google/generative-ai");


const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);



// Gemini Retry Function

const fetchWithRetry = async (
    requestFunction,
    retries = 5,
    delay = 1000
) => {

    try {

        return await requestFunction();


    } catch(error) {


        if(retries === 0){

            throw error;

        }


        console.log(
            `Retrying... Remaining attempts: ${retries}`
        );


        await new Promise(resolve =>
            setTimeout(resolve, delay)
        );


        return fetchWithRetry(
            requestFunction,
            retries - 1,
            delay * 2
        );

    }

};





// Create Trip with Gemini

const createTrip = async(req,res)=>{


    try{


        const {

            destination,

            durationDays,

            budgetTier,

            interests


        } = req.body;



        const userId = req.user.id;




        const model = genAI.getGenerativeModel({

            model:"gemini-2.5-flash"

        });




        const prompt = `

Create a travel itinerary.

Destination:
${destination}

Duration:
${durationDays} days

Budget:
${budgetTier}

Interests:
${interests.join(",")}


Return ONLY JSON.

Format:

{
 "itinerary":[
  {
   "dayNumber":1,
   "activities":[
    {
     "title":"",
     "description":"",
     "estimatedCostUSD":0,
     "timeOfDay":"Morning"
    }
   ]
  }
 ],


 "hotels":[
  {
   "name":"",
   "tier":"",
   "estimatedCostNightUSD":0,
   "rating":""
  }
 ],


 "estimatedBudget":{
   "transport":0,
   "accommodation":0,
   "food":0,
   "activities":0,
   "total":0
 },


 "packingList":[
  {
   "item":"",
   "category":"Documents",
   "isPacked":false
  }
 ]

}

`;



        const result = await fetchWithRetry(

            () => model.generateContent(prompt)

        );



        const response = result.response.text();



        const aiData = JSON.parse(response);




        const newTrip = new Trip({

            userId,

            destination,

            durationDays,

            budgetTier,

            interests,


            itinerary: aiData.itinerary,

            hotels: aiData.hotels,

            estimatedBudget:
            aiData.estimatedBudget,

            packingList:
            aiData.packingList

        });



        const savedTrip = await newTrip.save();



        res.status(201).json(savedTrip);



    }catch(error){


        console.log(error);


        res.status(500).json({

            message:"Trip generation failed"

        });

    }

};







// Get logged in user's trips

const getTrips = async(req,res)=>{


    try{


        const trips = await Trip.find({

            userId:req.user.id

        });



        res.json(trips);



    }catch(error){


        res.status(500).json({

            message:error.message

        });

    }

};








// Update Trip

const updateTrip = async(req,res)=>{


    try{


        const trip = await Trip.findOne({

            _id:req.params.id,

            userId:req.user.id

        });



        if(!trip){

            return res.status(404).json({

                message:"Trip not found"

            });

        }




        Object.assign(

            trip,

            req.body

        );




        const updatedTrip = await trip.save();




        res.json(updatedTrip);



    }catch(error){


        res.status(500).json({

            message:error.message

        });

    }

};






module.exports = {


    createTrip,

    getTrips,

    updateTrip

};