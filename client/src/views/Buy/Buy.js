import React, { useEffect} from 'react';
import { checkLogin } from '../../Utils/Auth';
import { useParams } from 'react-router-dom';


function Buy() {

    const {id}= useParams();

    useEffect(()=>{
        checkLogin();
       

    },[]);
  return (
    <div>buy</div>
  )
}

export default Buy