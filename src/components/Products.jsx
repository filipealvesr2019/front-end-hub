import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

import Signup from '../pages/Signup'
import axios from "axios";
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
          if(isRegistered === true){
            setIsRegistered(response.data.isRegistered)

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

  if (!customerID) {
    return <div>Cliente não está logado.</div>;
  }

  if (!customerDetails) {
    return <div>Carregando detalhes do cliente...</div>;
  }
    return (
        <>
        
        <p>{isRegistered ? <>Produtos</> :  <Signup />}</p>
       
        </>
    )
}