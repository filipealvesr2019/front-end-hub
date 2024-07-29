import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Signup from '../pages/Signup'
export default function Products(){

    // const [customer, setCustomer] = useState(null);
    // const [error, setError] = useState(null);
  
    // useEffect(() => {
    //   const fetchCustomer = async () => {
    //     try {
    //       const response = await axios.get(`http://localhost:3003/api/customer/cus_000006132423`);
    //       setCustomer(response.data);
    //     } catch (err) {
    //       setError(err.response?.data?.message || 'Erro ao buscar cliente.');
    //     }
    //   };
  
    //   fetchCustomer();
    // }, []);
  
    // if (error) {
    //   return <div >{error}</div>;
    // }
  
    // if (!customer) {
    //   return <div >Carregando...</div>;
    // }
    return (
        <>
        Products
 
        <Signup />
        </>
    )
}