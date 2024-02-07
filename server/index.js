import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Product from "./models/product.js";
import User from "./models/User.js";



const app= express();
app.use(express.json());



const connectMongoDB = async()=>{
    const connection= await mongoose.connect(process.env.MONGODB_URI);
    if(connection){
        console.log('connected to mongoDB');
    }

}
connectMongoDB();





app.post('/product', async (req, res)=>{

    

    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.body.image;

    const product =new Product({
        name: name,
        price:price,
        description:description,
        image:image
    });
    try{
    const savedProduct = await product.save();

    res.json({
        success:true,
        data:savedProduct,
        message:'data inserted successfully'
    });
}catch(e){
    res.json({
        success:false,
        message: e.message
    })
}


})



app.get('/products', async (req,res)=>{

    const products =await Product.find();

    
    res.json({
       success:true,
       data: products,
       description: 'data retrived successfully'
        
    });
});

app.get('/product/:id', async (req, res )=>{
    const {id}= req.params;
    const product= await Product.findOne({_id:id});

    res.json({
        success:true,
        data:product,
        description:"product retrived successfully"
    });
});

app.delete('/product/:id', async(req, res)=>{
    const {id} = req.params;

    await Product.deleteOne({_id: id});

    res.json({
        success:true,
        message:"data deleted successfully"
    });
});

app.put('/product/:id',async (req, res)=>{
    const {id}= req.params;
    const {name,price, description,image}= req.body;

    await Product.updateOne({_id: id},{$set:{
        name:name,
        price:price,
        description:description,
        image:image
    }});

    const updateProduct = await Product.findOne({_id: id});
    
    res.json({
        success:true,
        data:updateProduct,
        message:"product updated successfully"
    });


});

app.post('/singup', async(req, res)=>{
    const {name, email, mobileno, password}= req.body;
    const user = new User({
        name:name,
        email:email,
        mobileno:mobileno,
        password:password
    });

    try{
        const saveduser = await user.save();

        return res.json({
            success:true,
            data:saveduser,
            message:"user register successfully"
        });
    }

    catch(e){
        return res.json({
        success:false,
        message: e.message
    })
    
    }
})

app.post('/login',async(req, res)=>{
    const { email, password}= req.body;

    const user = await User.findOne({email:email, password: password});

    if(user){
        return res.json({
            success:true,
            data:user,
            message:"user logged in successfully"
        })
    }

    else{
        return res.json({
            success:false,
            message:'inavalid username and password'
        })
    }


})





const PORT= 5000;

app.listen(PORT, ()=>{
    console.log(`server is running on port ${5000}`);
})