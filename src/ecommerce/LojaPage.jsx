import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "./Navbar/Navbar";
import Tabs from "./tabs/Tabs";
import SearchBar from "./SearchBar/SearchBar";
import Layout1 from "../ecommerce/layout/Layout1.module.css";
import Layout2 from "../ecommerce/layout/Layout2.module.css";
const LojaPage = () => {
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
  const [logo, setLogo] = useState("");
  const [layout, setLayout] = useState("");
  useEffect(() => {
    const fetchEcommerce = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3003/api/ecommerce/user/66a6e6e84e3a81ac32025fa0`
        );
        setEcommerce(response.data);
        setLogo(response.data.theme.header.Logo)
        setHeaderBackgroundColor(response.data.theme.header.backgroundColor);
        setHeaderColor(response.data.theme.header.color);
        setMainBackgroundColor(response.data.theme.main.backgroundColor);
        setMainColor(response.data.theme.main.color);
        setFooterBackgroundColor(response.data.theme.footer.backgroundColor);
        setLayout(response.data.layout);
        setFooterColor(response.data.theme.footer.color);
      } catch (error) {
        console.error("Erro ao buscar o e-commerce:", error);
      }
    };

    fetchEcommerce();
  }, [dominio]);

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
  



  if (!ecommerce) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <div className={styles .container}>
        <div className={styles .screenContainer}>
          <div
            style={{ backgroundColor: mainBackgroundColor, color: mainColor }}
          >
            <header
              style={{
                backgroundColor: headerBackgroundColor,
                color: headerColor,
                cursor: headerBackgroundColor || headerColor ? "pointer" : "",
              }}
              className={styles.header}
            >
              <Navbar />

              <img style={{ color: "white", width:"5vw" }} src={logo} />
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
            <Tabs />
            <main className={styles.main}>
              <span>Conteúdo Principal da Loja</span>
       
            </main>
            <footer
              style={{
                backgroundColor: footerBackgroundColor,
                color: footerColor,
              }}
              className={styles.footer}
            >
              <span>Footer da Loja</span>
            </footer>
          </div>
       
        </div>
      </div>
    </>
  );
};

export default LojaPage;
