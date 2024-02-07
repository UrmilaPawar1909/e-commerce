import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";

function Home (){
    const [products,setProducts] = useState([]);

    const loadProducts =async ()=>{
        const response =await axios.get('/products')
        setProducts(response?.data?.data)
    }

    const checkLogin = async()=>{
        const user = JSON.parse(localStorage.getItem('user')) || null;

        if(!user){
            alert('please login first');
            window.location.href = "/login";
        }
    }

    useEffect(()=>{
        checkLogin();
        loadProducts();

    },[]);

    return(
        <div>

        <h1 className="text-center">All Products</h1>
        <div className="product-container">
        {
            
            
               products?.map((product, index)=>{
                  return(<div className="product-card">
                    <img className="product-img" src={product.image} alt={product.name}/>
                    <h1 className="product-info">{product.name}</h1>
                    <h2 className="product-info">₹{product.price}</h2>
                    <p className="product-info">{product.description}</p>
                    <button className="btn-buynow"> Buy Now</button>
              </div>
                )
              })

           


        }
        </div>
        </div>
    )
}

export default Home;