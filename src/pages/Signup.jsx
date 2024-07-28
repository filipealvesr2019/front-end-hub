import React, { useState } from 'react';
import axios from 'axios';
import styles from './Signup.module.css';

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
    asaasCustomerId: '',
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/api/signup', formData);
      setMessage(response.data.message);
      setError(null);
      setIsRegistered(true); // Definir como true quando o usuário for cadastrado
    } catch (err) {
      setMessage(null);
      setError(err.response.data.message || 'Erro ao criar usuário.');
      setIsRegistered(false);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <h1>Cadastro de Usuário</h1>
      {message && <div className={styles.successMessage}>{message}</div>}
      {error && <div className={styles.errorMessage}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="custumerId"
          placeholder="Customer ID"
          value={formData.custumerId}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cpfCnpj"
          placeholder="CPF/CNPJ"
          value={formData.cpfCnpj}
          onChange={handleChange}
        />
        <input
          type="text"
          name="mobilePhone"
          placeholder="Telefone"
          value={formData.mobilePhone}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="postalCode"
          placeholder="CEP"
          value={formData.postalCode}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Endereço"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="addressNumber"
          placeholder="Número"
          value={formData.addressNumber}
          onChange={handleChange}
        />
        <input
          type="text"
          name="complement"
          placeholder="Complemento"
          value={formData.complement}
          onChange={handleChange}
        />
        <input
          type="text"
          name="province"
          placeholder="Bairro"
          value={formData.province}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="Cidade"
          value={formData.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="state"
          placeholder="Estado"
          value={formData.state}
          onChange={handleChange}
        />
        <button type="submit">Cadastrar</button>
      </form>
      {isRegistered && <p className={styles.registeredMessage}>Usuário cadastrado com sucesso!</p>}
    </div>
  );
};

export default Signup;
