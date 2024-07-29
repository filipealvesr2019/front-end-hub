import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    custumerId: '',
    name: '',
    cpfCnpj: '',
    mobilePhone: '',
    email: '',
    postalCode: '',
    address: '',
    addressNumber: '',
    complement: '',
    province: '',
    city: '',
    state: '',
    asaasCustomerId: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3003/api/signup', formData);
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Erro ao criar usuário.');
      }
    }
  };

  return (
    <div>
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="custumerId" placeholder="Customer ID" onChange={handleChange} value={formData.custumerId} required />
        <input type="text" name="name" placeholder="Nome" onChange={handleChange} value={formData.name} required />
        <input type="text" name="cpfCnpj" placeholder="CPF/CNPJ" onChange={handleChange} value={formData.cpfCnpj} required />
        <input type="text" name="mobilePhone" placeholder="Telefone" onChange={handleChange} value={formData.mobilePhone} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} required />
        <input type="text" name="postalCode" placeholder="CEP" onChange={handleChange} value={formData.postalCode} required />
        <input type="text" name="address" placeholder="Endereço" onChange={handleChange} value={formData.address} required />
        <input type="text" name="addressNumber" placeholder="Número" onChange={handleChange} value={formData.addressNumber} required />
        <input type="text" name="complement" placeholder="Complemento" onChange={handleChange} value={formData.complement} />
        <input type="text" name="province" placeholder="Bairro" onChange={handleChange} value={formData.province} required />
        <input type="text" name="city" placeholder="Cidade" onChange={handleChange} value={formData.city} required />
        <input type="text" name="state" placeholder="Estado" onChange={handleChange} value={formData.state} required />
        <button type="submit">Cadastrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
