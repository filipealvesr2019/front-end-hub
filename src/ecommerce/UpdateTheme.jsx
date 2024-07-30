import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ColorCircle from './colors/ColorCircle'; // Import the ColorCircle component
import styles from './LojaPage.module.css';
import EditIcon from '@mui/icons-material/Edit';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import DesktopMacOutlinedIcon from '@mui/icons-material/DesktopMacOutlined';
const UpdateTheme = () => {
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
          <div className={styles.stylesHeader}>
            <label>Cor de Fundo do Header:</label>
            <ColorCircle color={headerBackgroundColor} onChange={setHeaderBackgroundColor} />
          </div>
        );
      case 'headerText':
        return (
          <div>
            <label>Cor do Texto do Header:</label>
            <ColorCircle color={headerColor} onChange={setHeaderColor} />
          </div>
        );
      case 'mainBackground':
        return (
          <div>
            <label>Cor de Fundo do Main:</label>
            <ColorCircle color={mainBackgroundColor} onChange={setMainBackgroundColor} />
          </div>
        );
      case 'mainText':
        return (
          <div>
            <label>Cor do Texto do Main:</label>
            <ColorCircle color={mainColor} onChange={setMainColor} />
          </div>
        );
      case 'footerBackground':
        return (
          <div>
            <label>Cor de Fundo do Footer:</label>
            <ColorCircle color={footerBackgroundColor} onChange={setFooterBackgroundColor} />
          </div>
        );
      case 'footerText':
        return (
          <div>
            <label>Cor do Texto do Footer:</label>
            <ColorCircle color={footerColor} onChange={setFooterColor} />
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
    <>
       <section  className={styles.section}>

<PhoneIphoneOutlinedIcon  sx={{
  fontSize: "3vw"
}}/>
<DesktopMacOutlinedIcon  sx={{
  fontSize: "3vw"
}}/>
<button onClick={() => setIsEditMode(!isEditMode)} className={styles.button}>
  {isEditMode ? 'Salvar Tema' : 'Editar Tema'} <EditIcon />
</button>
</section>

    <div className={styles.container}>

      <div className={styles.div}>
        
      </div>

      <div className={styles.screenContainer}>
   

{isEditMode && renderEditControls()}
<div
style={{ backgroundColor: mainBackgroundColor, color: mainColor }}
onClick={() => isEditMode && setEditingSection('mainBackground')}
>
<header
  style={{ backgroundColor: headerBackgroundColor, color: headerColor , cursor: headerBackgroundColor || headerColor ? "pointer" : ""  }}
  onClick={(e) => {
    e.stopPropagation();
    if (isEditMode) setEditingSection('headerBackground');
  }}
  className={styles.header}
>
  <span
    onClick={(e) => {
      e.stopPropagation();
      if (isEditMode) setEditingSection('headerText');
    }}
  >
    Header da Loja
  </span>
</header>
<main  className={styles.main}>
  <span
    onClick={(e) => {
      e.stopPropagation();
      if (isEditMode) setEditingSection('mainText');
    }}
  >
    Conteúdo Principal da Loja
  </span>
</main>
<footer
  style={{ backgroundColor: footerBackgroundColor, color: footerColor }}
  onClick={(e) => {
    e.stopPropagation();
    if (isEditMode) setEditingSection('footerBackground');
  }}
  className={styles.footer}
>
  <span
    onClick={(e) => {
      e.stopPropagation();
      if (isEditMode) setEditingSection('footerText');
    }}
  >
    Footer da Loja
  </span>
</footer>
</div>


      </div>
     
    </div>

    </>
  );
};

export default UpdateTheme;
