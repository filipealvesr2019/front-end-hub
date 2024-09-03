import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

import Signup from './Signup'
import axios from "axios";
import ProductsContainer from './ProductsContainer'
export default function Products(){

  const customerID = Cookies.get('customerID'); // Obtenha o ID do cliente do cookie
  const [customerDetails, setCustomerDetails] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (customerID) {
      const fetchCustomerDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3003/api/customer/${customerID}`);
          setCustomerDetails(response.data);
          setIsRegistered(response.data.isRegistered)

          if(isRegistered){
            setIsRegistered(true)

          } else {
            setIsRegistered(false)
          }
        } catch (error) {
          console.error('Erro ao buscar detalhes do cliente:', error);
        }
      };

      fetchCustomerDetails();
    }
  }, [customerID]);


 
    return (
        <>
    
        <p>{!isRegistered ? <ProductsContainer />:  <Signup />}</p>
       
        </>
    )
}