import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ColorCircle from "./colors/ColorCircle"; // Import the ColorCircle component
import styles from "./UpdateTheme.module.css";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import SearchBar from "./SearchBar/SearchBar";

const UpdateTheme = () => {
  const { dominio } = useParams();
  const [ecommerce, setEcommerce] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [headerBackgroundColor, setHeaderBackgroundColor] = useState("");
  const [headerColor, setHeaderColor] = useState("");
  const [icon, setIcon] = useState("");
  const [mainBackgroundColor, setMainBackgroundColor] = useState("");
  const [mainColor, setMainColor] = useState("");
  const [footerBackgroundColor, setFooterBackgroundColor] = useState("");
  const [footerColor, setFooterColor] = useState("");
  const [switchIcon, setSwitchIcon] = useState(true); // Alterei para booleano
  const [logo, setLogo] = useState("");
  useEffect(() => {
    const fetchEcommerce = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3003/api/ecommerce/user/66a6e6e84e3a81ac32025fa0`
        );
        setEcommerce(response.data);
        setLogo(response.data.theme.header.Logo);
        setHeaderBackgroundColor(response.data.theme.header.backgroundColor);
        setHeaderColor(response.data.theme.header.color);
        setMainBackgroundColor(response.data.theme.main.backgroundColor);
        setIcon(response.data.theme.header.icons);

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
    setSwitchIcon((prev) => !prev); // Alterna o valor booleano
  };

  const handleSwitchPage = (page) => {
    setEditingSection(page); // Atualiza a seção de edição
  };

  const renderSwitchPage = () => {
    switch (editingSection) {
      case "header":
        return (
          <div style={{backgroundColor:"white"}}>
            <KeyboardArrowLeftOutlinedIcon
              onClick={() => setEditingSection(null)}
            />{" "}
            <span>Sair</span>
            <label>Cor de Fundo do Header:</label>
            <ColorCircle
              color={headerBackgroundColor}
              onChange={setHeaderBackgroundColor}
            />
            <label>Cor do Texto do Header:</label>
            <ColorCircle color={headerColor} onChange={setHeaderColor} />
          </div>
        );
      case "pagina inicial":
        return (
          <div>
            <KeyboardArrowLeftOutlinedIcon
              onClick={() => setEditingSection(null)}
            />
            <span>Sair</span>
            <label>Cor de Fundo do Main:</label>
            <ColorCircle
              color={mainBackgroundColor}
              onChange={setMainBackgroundColor}
            />
            <label>Cor do Texto do Main:</label>
            <ColorCircle color={mainColor} onChange={setMainColor} />
          </div>
        );
      case "detalhes do produto":
        return (
          <div>
            <KeyboardArrowLeftOutlinedIcon
              onClick={() => setEditingSection(null)}
            />{" "}
            <span>Sair</span>
            <label>Cor de Fundo do Footer:</label>
            <ColorCircle
              color={footerBackgroundColor}
              onChange={setFooterBackgroundColor}
            />
            <label>Cor do Texto do Footer:</label>
            <ColorCircle color={footerColor} onChange={setFooterColor} />
          </div>
        );
      default:
        return <></>;
    }
  };

  const renderSwitchContent = () => {
    switch (editingSection) {
      case "pagina inicial":
        return <div>pagina inicial</div>;
      case "detalhes do produto":
        return <div>detalhes do produto</div>;
      default:
        return (
          <>
            <div
              style={{
                display: "flex",
                justifyItems: "flex-end",
                width: "100vw",
              }}
            ></div>
          </>
        );
    }
  };

  const renderSwitchToMobileContent = () => {
    switch (editingSection) {
      case "pagina inicial":
        return <div>pagina inicial mobile</div>;
      case "detalhes do produto":
        return <div>detalhes do produto mobile</div>;
      default:
        return <></>;
    }
  };

  return (
    <>
      <div className={styles.section}>
        <span
          style={{
            color: "white",
            cursor: "pointer",
          }}
          onClick={handleClickSwitchIcon}
        >
          {switchIcon ? "modo desktop" : "modo celular"}
        </span>
        <a
          onClick={handleClickSwitchIcon}
          style={{
            color: "white",
            cursor: "pointer",
          }}
        >
          <img
            src={
              switchIcon
                ? "https://i.imgur.com/9TngDuX.png"
                : "https://i.imgur.com/A2cWRwb.png"
            }
            title="source: imgur.com"
          />
        </a>
      </div>

      <div className={styles.container}>
        <div className={styles.div}>{renderSwitchPage()}</div>

        <div className={styles.screenContainer}>
          {switchIcon ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div className={styles.menu}>
                  <span onClick={() => handleSwitchPage("header")}>
                    Cabeçalho
                  </span>
                  <span onClick={() => handleSwitchPage("pagina inicial")}>
                    Página Inicial
                  </span>
                  <span onClick={() => handleSwitchPage("detalhes do produto")}>
                    Detalhes do Produto
                  </span>
                  <span onClick={() => handleSwitchPage("mainText")}>
                    Texto do Main
                  </span>
                  <span onClick={() => handleSwitchPage("footerBackground")}>
                    Fundo do Footer
                  </span>
                  <span onClick={() => handleSwitchPage("footerText")}>
                    Texto do Footer
                  </span>
                </div>

                <div className={styles.HomeContainer}>
                  <div className="desktop-view-container">
                    <div className="desktop-device">
                      <iframe
                        src="http://localhost:3004/loja" // Substitua pela URL do seu site
                        title="Desktop View"
                        style={{
                          width: "1180px", // Largura típica de um monitor de desktop
                          height: "800px", // Altura para visualização em desktop
                          border: "none",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.containerDesktop}>
                {renderSwitchContent()}
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div className={styles.menu}>
                  <span onClick={() => handleSwitchPage("header")}>
                    Cabeçalho
                  </span>
                  <span onClick={() => handleSwitchPage("pagina inicial")}>
                    Página Inicial
                  </span>
                  <span onClick={() => handleSwitchPage("detalhes do produto")}>
                    Detalhes do Produto
                  </span>
                  <span onClick={() => handleSwitchPage("mainText")}>
                    Texto do Main
                  </span>
                  <span onClick={() => handleSwitchPage("footerBackground")}>
                    Fundo do Footer
                  </span>
                  <span onClick={() => handleSwitchPage("footerText")}>
                    Texto do Footer
                  </span>
                </div>
                <div
                  style={{
                    backgroundColor: mainBackgroundColor,
                    color: mainColor,
                  }}
                  onClick={() =>
                    isEditMode && setEditingSection("mainBackground")
                  }
                  className={styles.HomeContainerMobile}
                >
                  <div className="mobile-view-container">
                    <div className="mobile-device">
                      <iframe
                        src="http://localhost:3004/loja" // Substitua pela URL que deseja visualizar
                        title="Mobile View"
                        style={{
                          width: "360px", // Largura típica de um dispositivo móvel
                          height: "640px", // Altura típica de um dispositivo móvel
                          border: "none",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.containerDesktop}>
                {renderSwitchToMobileContent()}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateTheme;
