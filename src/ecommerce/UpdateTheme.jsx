import React, { useState } from 'react';
import axios from 'axios';

const UpdateTheme = ({ ecommerceId }) => {
  const [headerBackgroundColor, setHeaderBackgroundColor] = useState('');
  const [headerColor, setHeaderColor] = useState('');
  const [mainBackgroundColor, setMainBackgroundColor] = useState('');
  const [mainColor, setMainColor] = useState('');
  const [footerBackgroundColor, setFooterBackgroundColor] = useState('');
  const [footerColor, setFooterColor] = useState('');

  const handleUpdateTheme = async () => {
    try {
      await axios.post(`http://localhost:3003/api/ecommerce/${ecommerceId}/update-theme`, {
        theme: {
          header: {
            backgroundColor: headerBackgroundColor,
            color: headerColor,
          },
          main: {
            backgroundColor: mainBackgroundColor,
            color: mainColor,
          },
          footer: {
            backgroundColor: footerBackgroundColor,
            color: footerColor,
          },
        },
      });
      alert('Tema atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar o tema:', error);
    }
  };

  return (
    <div>
      <h2>Atualizar Tema</h2>
      <div>
        <label>
          Cor de Fundo do Header:
          <input type="color" value={headerBackgroundColor} onChange={(e) => setHeaderBackgroundColor(e.target.value)} />
        </label>
        <label>
          Cor do Texto do Header:
          <input type="color" value={headerColor} onChange={(e) => setHeaderColor(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Cor de Fundo do Main:
          <input type="color" value={mainBackgroundColor} onChange={(e) => setMainBackgroundColor(e.target.value)} />
        </label>
        <label>
          Cor do Texto do Main:
          <input type="color" value={mainColor} onChange={(e) => setMainColor(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Cor de Fundo do Footer:
          <input type="color" value={footerBackgroundColor} onChange={(e) => setFooterBackgroundColor(e.target.value)} />
        </label>
        <label>
          Cor do Texto do Footer:
          <input type="color" value={footerColor} onChange={(e) => setFooterColor(e.target.value)} />
        </label>
      </div>
      <button onClick={handleUpdateTheme}>Atualizar Tema</button>
    </div>
  );
};

export default UpdateTheme;
