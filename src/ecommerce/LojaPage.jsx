import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LojaPage = () => {
  const { dominio } = useParams();
  const [ecommerce, setEcommerce] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
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
      setEditingSection(null);
      alert('Tema atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar o tema:', error);
    }
  };

  const renderEditControls = () => {
    if (!isEditMode) return null;

    switch (editingSection) {
      case 'headerBackground':
        return (
          <div>
            <label>
              Cor de Fundo do Header:
              <input
                type="color"
                value={headerBackgroundColor}
                onChange={(e) => setHeaderBackgroundColor(e.target.value)}
              />
            </label>
          </div>
        );
      case 'headerText':
        return (
          <div>
            <label>
              Cor do Texto do Header:
              <input type="color" value={headerColor} onChange={(e) => setHeaderColor(e.target.value)} />
            </label>
          </div>
        );
      case 'mainBackground':
        return (
          <div>
            <label>
              Cor de Fundo do Main:
              <input
                type="color"
                value={mainBackgroundColor}
                onChange={(e) => setMainBackgroundColor(e.target.value)}
              />
            </label>
          </div>
        );
      case 'mainText':
        return (
          <div>
            <label>
              Cor do Texto do Main:
              <input type="color" value={mainColor} onChange={(e) => setMainColor(e.target.value)} />
            </label>
          </div>
        );
      case 'footerBackground':
        return (
          <div>
            <label>
              Cor de Fundo do Footer:
              <input
                type="color"
                value={footerBackgroundColor}
                onChange={(e) => setFooterBackgroundColor(e.target.value)}
              />
            </label>
          </div>
        );
      case 'footerText':
        return (
          <div>
            <label>
              Cor do Texto do Footer:
              <input type="color" value={footerColor} onChange={(e) => setFooterColor(e.target.value)} />
            </label>
          </div>
        );
      default:
        return null;
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
      {isEditMode && renderEditControls()}
      <div
        style={{ backgroundColor: mainBackgroundColor, color: mainColor }}
        onClick={() => isEditMode && setEditingSection('mainBackground')}
      >
        <header
          style={{ backgroundColor: headerBackgroundColor, color: headerColor }}
          onClick={(e) => {
            e.stopPropagation();
            if (isEditMode) setEditingSection('headerBackground');
          }}
        >
          <span onClick={(e) => {
            e.stopPropagation();
            if (isEditMode) setEditingSection('headerText');
          }}>
            Header da Loja
          </span>
        </header>
        <main>
          <span onClick={(e) => {
            e.stopPropagation();
            if (isEditMode) setEditingSection('mainText');
          }}>
            Conteúdo Principal da Loja
          </span>
        </main>
        <footer
          style={{ backgroundColor: footerBackgroundColor, color: footerColor }}
          onClick={(e) => {
            e.stopPropagation();
            if (isEditMode) setEditingSection('footerBackground');
          }}
        >
          <span onClick={(e) => {
            e.stopPropagation();
            if (isEditMode) setEditingSection('footerText');
          }}>
            Footer da Loja
          </span>
        </footer>
      </div>
    </div>
  );
};

export default LojaPage;
