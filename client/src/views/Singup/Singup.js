import react, { useState } from "react";
import "./Singup.css";
import axios from "axios";

function Singup() {

    const [name, setName]= useState('');
    const [email, setEmail]= useState('');
    const [mobileno, setMobileno]= useState('');
    const [password, setPassword]= useState('');

    const singup = async()=>{
        const response =await axios.post('/singup',{
            name:name,
            email:email,
            mobileno:mobileno,
            password:password
        });

        if(response.data.data){
            alert(response.data.message)
            window.location.href ="/login";

        }
    }






    return (

        <div>
            <div className="singup-container">

                <h1 className="singup-title">Singup</h1>
                <div className="input-container">
                    <label className="input-label">Name</label>
                    <input type="text"
                        placeholder="Enter your Name"
                        className="input-field"
                        value={name}
                        onChange={(e)=>{
                            setName(e.target.value)
                        }} />
                </div>
                <div className="input-container">

                    <label className="input-label">Email</label>
                    <input type="email"
                        placeholder="Enter your Email"
                        className="input-field"
                         value={name}
                        onChange={(e)=>{
                            setName(e.target.value)
                        }} />
                </div>
                <div className="input-container">

                    <label className="input-label">Mobile No.</label>
                    <input type="text"
                        placeholder="Enter your Mobile No"
                        className="input-field"
                        value={mobileno}
                        onChange={(e)=>{
                            setMobileno(e.target.value)
                        }} />
                </div>

                <div className="input-container">

                    <label className="input-label">Password</label>
                    <input type="password"
                        placeholder="Enter your Password"
                        className="input-field"
                        value={password}
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }} />

                </div>

                <button type="button" className="btn-singup" onClick={singup}>Singup</button>





            </div>


        </div>
    )
}

export default Singup;