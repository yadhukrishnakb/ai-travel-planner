const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Register User
const register = async (req, res) => {

    try {

        const { email, password, name } = req.body;


        // check existing user
        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(400).json({
                message:"User already exists"
            });
        }


        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);


        // create user
        const user = await User.create({
            email,
            password: hashedPassword,
            name
        });


        res.status(201).json({
            message:"User registered successfully",
            user:{
                id:user._id,
                email:user.email
            }
        });


    } catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// Login User
const login = async(req,res)=>{

    try{

        const {email,password}=req.body;


        // find user
        const user = await User.findOne({email});


        if(!user){

            return res.status(400).json({
                message:"Invalid email or password"
            });

        }



        // compare password

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );


        if(!isMatch){

            return res.status(400).json({
                message:"Invalid email or password"
            });

        }



        // create token

        const token = jwt.sign(
            {
                id:user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d"
            }
        );



        res.json({

            message:"Login successful",

            token

        });



    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



module.exports = {
    register,
    login
};