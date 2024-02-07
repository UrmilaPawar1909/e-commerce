import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import { checkLogin } from "../../Utils/Auth";
import { Link } from "react-router-dom";

function Home (){
    const [products,setProducts] = useState([]);

    const loadProducts =async ()=>{
        const response =await axios.get('/products')
        setProducts(response?.data?.data)
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
                    <Link className="btn-buynow" to={`${/buy/id}`}> Buy Now</Link>
              </div>
                )
              })

           


        }
        </div>
        </div>
    )
}

export default Home;