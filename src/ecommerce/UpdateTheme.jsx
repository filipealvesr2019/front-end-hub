// UpdateTheme.js
import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import {
  headerBackgroundColorAtom,
  headerColorAtom,
  mainBackgroundColorAtom,
  mainColorAtom,
  footerBackgroundColorAtom,
  footerColorAtom
} from '../../store/store';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ColorCircle from './colors/ColorCircle'; // Import the ColorCircle component
import styles from './UpdateTheme.module.css';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';

const UpdateTheme = () => {
  const { dominio } = useParams();
  const [ecommerce, setEcommerce] = useState(null);
  const [headerBackgroundColor, setHeaderBackgroundColor] = useAtom(headerBackgroundColorAtom);
  const [headerColor, setHeaderColor] = useAtom(headerColorAtom);
  const [mainBackgroundColor, setMainBackgroundColor] = useAtom(mainBackgroundColorAtom);
  const [mainColor, setMainColor] = useAtom(mainColorAtom);
  const [footerBackgroundColor, setFooterBackgroundColor] = useAtom(footerBackgroundColorAtom);
  const [footerColor, setFooterColor] = useAtom(footerColorAtom);
  const [switchIcon, setSwitchIcon] = useState(true); 
  const [logo, setLogo] = useState('');
  const [editingSection, setEditingSection] = useState(null);

  useEffect(() => {
    const fetchEcommerce = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3003/api/ecommerce/user/66a6e6e84e3a81ac32025fa0'
        );
        setEcommerce(response.data);
        setLogo(response.data.theme.header.Logo);
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
      await axios.post(
        'http://localhost:3003/api/ecommerce/66a7992463ef55fe9b702bb0/update-theme',
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
      alert('Tema atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar o tema:', error);
    }
  };

  if (!ecommerce) {
    return <div>Carregando...</div>;
  }

  const handleSwitchPage = (page) => {
    setEditingSection(page);
  };

  const renderSwitchPage = () => {
    switch (editingSection) {
      case 'header':
        return (
          <div style={{ backgroundColor: 'white' }}>
            <KeyboardArrowLeftOutlinedIcon
              onClick={() => setEditingSection(null)}
            />
            <span>Sair</span>
            <label>Cor de Fundo do Header:</label>
            <ColorCircle
              color={headerBackgroundColor}
              onChange={setHeaderBackgroundColor}
            />
            <label>Cor do Texto do Header:</label>
            <ColorCircle color={headerColor} onChange={setHeaderColor} />
            <button onClick={handleSave}>Salvar Alterações</button>
          </div>
        );
      case 'pagina inicial':
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
            <button onClick={handleSave}>Salvar Alterações</button>
          </div>
        );
      case 'detalhes do produto':
        return (
          <div>
            <KeyboardArrowLeftOutlinedIcon
              onClick={() => setEditingSection(null)}
            />
            <span>Sair</span>
            <label>Cor de Fundo do Footer:</label>
            <ColorCircle
              color={footerBackgroundColor}
              onChange={setFooterBackgroundColor}
            />
            <label>Cor do Texto do Footer:</label>
            <ColorCircle color={footerColor} onChange={setFooterColor} />
            <button onClick={handleSave}>Salvar Alterações</button>
          </div>
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <div className={styles.section}>
        <span
          style={{
            color: 'white',
            cursor: 'pointer',
          }}
          onClick={() => setSwitchIcon(!switchIcon)}
        >
          {switchIcon ? 'modo desktop' : 'modo celular'}
        </span>
      </div>

      <div className={styles.container}>
        <div className={styles.div}>{renderSwitchPage()}</div>

        <div className={styles.screenContainer}>
          {switchIcon ? (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                {editingSection !== 'header' && (
                  <div className={styles.menu}>
                    <span onClick={() => handleSwitchPage('header')}>
                      Cabeçalho
                    </span>
                    <span onClick={() => handleSwitchPage('pagina inicial')}>
                      Página Inicial
                    </span>
                    <span
                      onClick={() => handleSwitchPage('detalhes do produto')}
                    >
                      Detalhes do Produto
                    </span>
                  </div>
                )}

                <div className={styles.HomeContainer}>
                  <div className="desktop-view-container">
                    <div className="desktop-device">
                      <iframe
                        src="http://localhost:3004/loja"
                        title="Desktop View"
                        style={{
                          width: '1180px',
                          height: '800px',
                          border: 'none',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                {editingSection !== 'header' && (
                  <div className={styles.menu}>
                    <span onClick={() => handleSwitchPage('header')}>
                      Cabeçalho
                    </span>
                    <span onClick={() => handleSwitchPage('pagina inicial')}>
                      Página Inicial
                    </span>
                    <span
                      onClick={() => handleSwitchPage('detalhes do produto')}
                    >
                      Detalhes do Produto
                    </span>
                  </div>
                )}
                <div
                  style={{
                    backgroundColor: mainBackgroundColor,
                    color: mainColor,
                  }}
                  className={styles.HomeContainerMobile}
                >
                  <div className="mobile-view-container">
                    <div className="mobile-device">
                      <iframe
                        src="http://localhost:3004/loja"
                        title="Mobile View"
                        style={{
                          width: '360px',
                          height: '640px',
                          border: 'none',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateTheme;
