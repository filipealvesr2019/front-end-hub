import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout1 from "../ecommerce/layout/Layout1.module.css";
import Layout2 from "../ecommerce/layout/Layout2.module.css";
import Layout3 from "../ecommerce/layout/Layout3.module.css";
import Layout4 from "../ecommerce/layout/Layout4.module.css";
import Layout5 from "../ecommerce/layout/Layout5.module.css";
import Layout6 from "../ecommerce/layout/Layout6.module.css";
const ThemeDetail = () => {
  const { id } = useParams();
  const [theme, setTheme] = useState(null);
  const [error, setError] = useState(null);
  const [layout, setLayout] = useState("");
  const [switchIcon, setSwitchIcon] = useState(true); // Alterei para booleano

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3003/api/theme/${id}`
        );
        setTheme(response.data);
        setLayout(response.data.layout);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTheme();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!theme) {
    return <div>Loading...</div>;
  }
  const layoutStyles = () => {
    switch (layout) {
      case "layout1":
        return Layout1;
      case "layout2":
        return Layout2;
      case "layout3":
        return Layout3;
      case "layout4":
        return Layout4;
      case "layout5":
        return Layout5;
      case "layout6":
        return Layout6;
      default:
        return {}; // Retorna um objeto vazio se nenhum layout for encontrado
    }
  };

  const styles = layoutStyles(); // Chame a função para obter o estilo correto

  const handleClickSwitchIcon = () => {
    setSwitchIcon(!switchIcon);
  };
  return (
    <div className={styles.themeDetailContainer}>
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

      {switchIcon ? (
        <>
          {" "}
          <h1>{theme.name}</h1>
          <p>
            <strong>Categoria :</strong> {theme.category}
          </p>
          <div style={{ display: "flex", gap: "10px", flexDirection:"column" }}>
            <div
              style={{
                backgroundColor: theme.theme.header.backgroundColor,
                color: theme.theme.header.color,
                padding: "10px",
                height:"50vh"
              }}
            >
              <p>Header</p>
            </div>
            <div
              style={{
                backgroundColor: theme.theme.main.backgroundColor,
                color: theme.theme.main.color,
                padding: "10px",
                    height:"50vh"
              }}
            >
              <p>Main</p>
            </div>
            <div
              style={{
                backgroundColor: theme.theme.footer.backgroundColor,
                color: theme.theme.footer.color,
                padding: "10px",
               
                height:"50vh"
              }}
            >
              <p>Footer</p>
            </div>
           
          </div>
        </>
      ) : (
        <>
          {" "}
          <h1>{theme.name}</h1>
          <p>
            <strong>Categoria Mobile:</strong> {theme.category}
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <div
              style={{
                backgroundColor: theme.theme.header.backgroundColor,
                color: theme.theme.header.color,
                padding: "10px",
              }}
            >
              <p>Header Mobile</p>
            </div>
            <div
              style={{
                backgroundColor: theme.theme.footer.backgroundColor,
                color: theme.theme.footer.color,
                padding: "10px",
              }}
            >
              <p>Footer Mobile</p>
            </div>
            <div
              style={{
                backgroundColor: theme.theme.main.backgroundColor,
                color: theme.theme.main.color,
                padding: "10px",
              }}
            >
              <p>Main Mobile</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeDetail;
