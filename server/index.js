import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Product from "./models/product.js";



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

    const product =new Product({
        name: name,
        price:price,
        description:description
    });

    const savedProduct = await product.save();

    res.json({
        success:true,
        data:savedProduct,
        message:'data inserted successfully'
    })


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
    const {name,price, description}= req.body;

    await Product.updateOne({_id: id},{$set:{
        name:name,
        price:price,
        description:description
    }});

    const updateProduct = await Product.findOne({_id: id});
    
    res.json({
        success:true,
        data:updateProduct,
        message:"product updated successfully"
    });


});



const PORT= 5000;

app.listen(PORT, ()=>{
    console.log(`server is running on port ${5000}`);
})