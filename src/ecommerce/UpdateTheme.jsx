import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ColorCircle from "./colors/ColorCircle"; // Import the ColorCircle component
import styles from "./UpdateTheme.module.css";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";

const UpdateTheme = () => {
  const { dominio } = useParams();
  const [ecommerce, setEcommerce] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [headerBackgroundColor, setHeaderBackgroundColor] = useState("");
  const [headerColor, setHeaderColor] = useState("");
  const [mainBackgroundColor, setMainBackgroundColor] = useState("");
  const [mainColor, setMainColor] = useState("");
  const [footerBackgroundColor, setFooterBackgroundColor] = useState("");
  const [footerColor, setFooterColor] = useState("");
  const [switchIcon, setSwitchIcon] = useState(true); // Alterei para booleano

  useEffect(() => {
    const fetchEcommerce = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3003/api/ecommerce/user/66a6e6e84e3a81ac32025fa0`
        );
        setEcommerce(response.data);
        setHeaderBackgroundColor(response.data.theme.header.backgroundColor);
        setHeaderColor(response.data.theme.header.color);
        setMainBackgroundColor(response.data.theme.main.backgroundColor);
        setMainColor(response.data.theme.main.color);
        setFooterBackgroundColor(response.data.theme.footer.backgroundColor);
        setFooterColor(response.data.theme.footer.color);
      } catch (error) {
        console.error("Erro ao buscar o e-commerce:", error);
      }
    };

    fetchEcommerce();
  }, [dominio]);

  const handleSave = async () => {
    try {
      await axios.post(
        `http://localhost:3003/api/ecommerce/66a7992463ef55fe9b702bb0/update-theme`,
        {
          theme: {
            header: {
              backgroundColor: headerBackgroundColor,
              color: headerColor,
            },
            main: { backgroundColor: mainBackgroundColor, color: mainColor },
            footer: {
              backgroundColor: footerBackgroundColor,
              color: footerColor,
            },
          },
        }
      );
      setIsEditMode(false);
      setEditingSection(null);
      alert("Tema atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar o tema:", error);
    }
  };

  if (!ecommerce) {
    return <div>Carregando...</div>;
  }

  const handleClickSwitchIcon = () => {
    setSwitchIcon(prev => !prev); // Alterna o valor booleano
  };

  const handleSwitchPage = (page) => {
    setEditingSection(page); // Atualiza a seção de edição
  };

  const renderSwitchPage = () => {
    switch (editingSection) {
      case 'header':
        return (
          <div className={styles.stylesHeader}>
            <KeyboardArrowLeftOutlinedIcon onClick={() => setEditingSection(null)} /> <span>Sair</span>
            <label>Cor de Fundo do Header:</label>
            <ColorCircle color={headerBackgroundColor} onChange={setHeaderBackgroundColor} />
            <label>Cor do Texto do Header:</label>
            <ColorCircle color={headerColor} onChange={setHeaderColor} />
          </div>
        );
      case 'pagina inicial':
        return (
          <div>
               <KeyboardArrowLeftOutlinedIcon onClick={() => setEditingSection(null)} /><span>Sair</span>
            <label>Cor de Fundo do Main:</label>
            <ColorCircle color={mainBackgroundColor} onChange={setMainBackgroundColor} />
            <label>Cor do Texto do Main:</label>
            <ColorCircle color={mainColor} onChange={setMainColor} />
          </div>
        );
      case 'detalhes do produto':
        return (
          <div>

               <KeyboardArrowLeftOutlinedIcon onClick={() => setEditingSection(null)} /> <span>Sair</span>
            <label>Cor de Fundo do Footer:</label>
            <ColorCircle color={footerBackgroundColor} onChange={setFooterBackgroundColor} />
            <label>Cor do Texto do Footer:</label>
            <ColorCircle color={footerColor} onChange={setFooterColor} />
          </div>
        );
      default:
        return (
          <div className={styles.div}>
          <span onClick={() => handleSwitchPage('header')}>Cabeçalho</span>
          <span onClick={() => handleSwitchPage('pagina inicial')}>Página Inicial</span>
          <span onClick={() => handleSwitchPage('detalhes do produto')}>Detalhes do Produto</span>
          <span onClick={() => handleSwitchPage('mainText')}>Texto do Main</span>
          <span onClick={() => handleSwitchPage('footerBackground')}>Fundo do Footer</span>
          <span onClick={() => handleSwitchPage('footerText')}>Texto do Footer</span>
        </div>
        );
    }
  };

  return (
    <>
      <div className={styles.section}>
        <span
          style={{
            color: "white",
          }}
        >
          {switchIcon ? "modo celular" : "modo desktop"}
        </span>
        <a onClick={handleClickSwitchIcon}>
          <img
            src={switchIcon ? "https://i.imgur.com/A2cWRwb.png" : "https://i.imgur.com/9TngDuX.png"}
            title="source: imgur.com"
          />
        </a>
      </div>

      <div className={styles.container}>
        <div className={styles.div}>
         
    
          {renderSwitchPage()}
        </div>

        <div className={styles.screenContainer}>
          {switchIcon ? (
            <div
              style={{ backgroundColor: mainBackgroundColor, color: mainColor }}
              onClick={() => isEditMode && setEditingSection("mainBackground")}
            >
              <header
                style={{
                  backgroundColor: headerBackgroundColor,
                  color: headerColor,
                  cursor: headerBackgroundColor || headerColor ? "pointer" : "",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isEditMode) setEditingSection("header");
                }}
                className={styles.header}
              >
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isEditMode) setEditingSection("header");
                  }}
                >
                  Header da Loja
                </span>
              </header>
              <main className={styles.main}>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isEditMode) setEditingSection("pagina inicial");
                  }}
                >
                  Conteúdo Principal da Loja
                </span>
              </main>
              <footer
                style={{
                  backgroundColor: footerBackgroundColor,
                  color: footerColor,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isEditMode) setEditingSection("footerBackground");
                }}
                className={styles.footer}
              >
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isEditMode) setEditingSection("footerText");
                  }}
                >
                  Footer da Loja
                </span>
              </footer>
            </div>
          ) : (
            "teste"
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateTheme;
