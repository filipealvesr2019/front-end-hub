import { useState } from "react"
import Signup from '../pages/Signup'
export default function Products(){
    const [showForm, setShowForm] = useState(false)
    const [customer, setCustomer] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchCustomer = async () => {
        try {
          const response = await axios.get(`http://localhost:3002/api/customer/66a18fbeefe29016ebc5032d`);
          setCustomer(response.data);
          console.log()
        } catch (err) {
          setError(err.response?.data?.message || 'Erro ao buscar cliente.');
        }
      };
  
      fetchCustomer();
    }, []);
  
    if (error) {
      return <div className={styles.errorMessage}>{error}</div>;
    }
  
    if (!customer) {
      return <div className={styles.loading}>Carregando...</div>;
    }
    return (
        <>
        Produto mostrado
        {customer.isRegistered}
        <Signup />
        </>
    )
}