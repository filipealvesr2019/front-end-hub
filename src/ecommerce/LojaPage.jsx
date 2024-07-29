import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LojaPage = () => {
  const { dominio } = useParams();
  const [ecommerce, setEcommerce] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [headerBackgroundColor, setHeaderBackgroundColor] = useState('');
  const [headerColor, setHeaderColor] = useState('');
  const [mainBackgroundColor, setMainBackgroundColor] = useState('');
  const [mainColor, setMainColor] = useState('');
  const [footerBackgroundColor, setFooterBackgroundColor] = useState('');
  const [footerColor, setFooterColor] = useState('');

  useEffect(() => {
    const fetchEcommerce = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/api/ecommerce/user/66a6e6e84e3a81ac32025fa0`);
        setEcommerce(response.data);
        setHeaderBackgroundColor(response.data.theme.header.backgroundColor);
        setHeaderColor(response.data.theme.header.color);
        setMainBackgroundColor(response.data.theme.main.backgroundColor);
        setMainColor(response.data.theme.main.color);
        setFooterBackgroundColor(response.data.theme.footer.backgroundColor);
        setFooterColor(response.data.theme.footer.color);
      } catch (error) {
        console.error('Erro ao buscar o e-commerce:', error);
      }
    };

    fetchEcommerce();
  }, [dominio]);

  const handleSave = async () => {
    try {
      await axios.post(`http://localhost:3003/api/ecommerce/66a7992463ef55fe9b702bb0/update-theme`, {
        theme: {
          header: { backgroundColor: headerBackgroundColor, color: headerColor },
          main: { backgroundColor: mainBackgroundColor, color: mainColor },
          footer: { backgroundColor: footerBackgroundColor, color: footerColor },
        },
      });
      setIsEditMode(false);
      alert('Tema atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar o tema:', error);
    }
  };

  if (!ecommerce) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <button onClick={() => setIsEditMode(!isEditMode)}>
        {isEditMode ? 'Salvar' : 'Editar Tema'}
      </button>
      {isEditMode && (
        <div>
          <div>
            <label>
              Cor de Fundo do Header:
              <input
                type="color"
                value={headerBackgroundColor}
                onChange={(e) => setHeaderBackgroundColor(e.target.value)}
              />
            </label>
            <label>
              Cor do Texto do Header:
              <input type="color" value={headerColor} onChange={(e) => setHeaderColor(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              Cor de Fundo do Main:
              <input
                type="color"
                value={mainBackgroundColor}
                onChange={(e) => setMainBackgroundColor(e.target.value)}
              />
            </label>
            <label>
              Cor do Texto do Main:
              <input type="color" value={mainColor} onChange={(e) => setMainColor(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              Cor de Fundo do Footer:
              <input
                type="color"
                value={footerBackgroundColor}
                onChange={(e) => setFooterBackgroundColor(e.target.value)}
              />
            </label>
            <label>
              Cor do Texto do Footer:
              <input type="color" value={footerColor} onChange={(e) => setFooterColor(e.target.value)} />
            </label>
          </div>
        </div>
      )}
      <div style={{ backgroundColor: mainBackgroundColor, color: mainColor }}>
        <header style={{ backgroundColor: headerBackgroundColor, color: headerColor }}>
          Header da Loja
        </header>
        <main>Conteúdo Principal da Loja</main>
        <footer style={{ backgroundColor: footerBackgroundColor, color: footerColor }}>
          Footer da Loja
        </footer>
      </div>
    </div>
  );
};

export default LojaPage;
