import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ColorCircle from "../ecommerce/colors/ColorCircle"; // Import the ColorCircle component

import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import SearchBar from "../ecommerce/SearchBar/SearchBar";
import NavbarMockup from "../ecommerce/Navbar/NavbarMockup";
import Cookies from "js-cookie";

import Layout1 from "../ecommerce/layout/Layout1.module.css";
import Layout2 from "../ecommerce/layout/Layout2.module.css";

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
  const [layout, setLayout] = useState("");
  const customerID = Cookies.get('customerID'); // Obtenha o ID do cliente do cookie
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
        setLayout(response.data.layout);
      } catch (error) {
        console.error("Erro ao buscar o e-commerce:", error);
      }
    };

    fetchEcommerce();
  }, [dominio]);

  const handleSave = async () => {
    try {
      await axios.post(
        `http://localhost:3003/api/ecommerce/${customerID}/update-theme`,
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
          <div style={{ backgroundColor: "white" }}>
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
  const layoutStyles = () => {
    switch (layout) {
      case "layout1":
        return Layout1;
      case "layout2":
        return Layout2;
      default:
        return {}; // Retorna um objeto vazio se nenhum layout for encontrado
    }
  };

  const styles = layoutStyles(); // Chame a função para obter o estilo correto

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
                {editingSection != "header" && (
                  <div className={styles.menu}>
                    <span onClick={() => handleSwitchPage("header")}>
                      Cabeçalho
                    </span>
                    <span onClick={() => handleSwitchPage("pagina inicial")}>
                      Página Inicial
                    </span>
                    <span
                      onClick={() => handleSwitchPage("detalhes do produto")}
                    >
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
                )}

                <div
                  onClick={() =>
                    isEditMode && setEditingSection("mainBackground")
                  }
                  className={styles.HomeContainer}
                >
                  <header
                    style={{
                      backgroundColor: headerBackgroundColor,
                      color: headerColor,
                      cursor:
                        headerBackgroundColor || headerColor ? "pointer" : "",
                    }}
                    className={styles.header}
                  >
                    <img style={{ color: "white", width: "5vw" }} src={logo} />
                    <SearchBar />
                    <div className={styles.header__icons}>
                      <a>
                        <img
                          src="https://i.imgur.com/ItjKDhc.png"
                          title="source: imgur.com"
                          style={{ width: "2.5rem" }}
                        />
                      </a>

                      <a>
                        <img
                          src="https://i.imgur.com/1XrvJJL.png"
                          title="source: imgur.com"
                          style={{ width: "2.5rem" }}
                        />
                      </a>
                    </div>
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
                  <header
                    style={{
                      backgroundColor: headerBackgroundColor,
                      color: headerColor,
                      cursor:
                        headerBackgroundColor || headerColor ? "pointer" : "",
                    }}
                    className={styles.headerMobile}
                  >
                    <NavbarMockup />
                    <img style={{ color: "white", width: "5vw" }} src={logo} />

                    <div className={styles.header__icons}>
                      <a>
                        <img
                          src="https://i.imgur.com/ItjKDhc.png"
                          title="source: imgur.com"
                          style={{ width: "2.5rem" }}
                        />
                      </a>

                      <a>
                        <img
                          src="https://i.imgur.com/1XrvJJL.png"
                          title="source: imgur.com"
                          style={{ width: "2.5rem" }}
                        />
                      </a>
                    </div>
                  </header>
                  <main className={styles.main}>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isEditMode) setEditingSection("pagina inicial");
                      }}
                    >
                      Conteúdo Principal da Loja mobile
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
                      Footer da Loja mobile
                    </span>
                  </footer>
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