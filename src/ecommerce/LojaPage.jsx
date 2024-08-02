// LojaPage.js
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
import header from './styles/layout/header.module.css';
import Navbar from './Navbar/Navbar';
import Tabs from './tabs/Tabs';
import SearchBar from './SearchBar/SearchBar';

const LojaPage = () => {
  const { dominio } = useParams();
  const [ecommerce, setEcommerce] = useState(null);

  // Use o useAtom para obter e definir os valores dos átomos
  const [headerBackgroundColor] = useAtom(headerBackgroundColorAtom);
  const [headerColor] = useAtom(headerColorAtom);
  const [mainBackgroundColor] = useAtom(mainBackgroundColorAtom);
  const [mainColor] = useAtom(mainColorAtom);
  const [footerBackgroundColor] = useAtom(footerBackgroundColorAtom);
  const [footerColor] = useAtom(footerColorAtom);

  useEffect(() => {
    const fetchEcommerce = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3003/api/ecommerce/user/66a6e6e84e3a81ac32025fa0`
        );
        setEcommerce(response.data);
      } catch (error) {
        console.error('Erro ao buscar o e-commerce:', error);
      }
    };

    fetchEcommerce();
  }, [dominio]);

  if (!ecommerce) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <div className={header.container}>
        <div className={header.screenContainer}>
          <div style={{ backgroundColor: mainBackgroundColor, color: mainColor }}>
            <header
              style={{
                backgroundColor: headerBackgroundColor,
                color: headerColor,
                cursor: headerBackgroundColor || headerColor ? 'pointer' : '',
              }}
              className={header.header}
            >
              <Navbar />
              <img style={{ color: 'white', width: '5vw' }} src={ecommerce.theme.header.Logo} />
              <SearchBar />
              <div className={header.header__icons}>
                <a>
                  <img
                    src="https://i.imgur.com/ItjKDhc.png"
                    title="source: imgur.com"
                    style={{ width: '2.5rem' }}
                  />
                </a>
                <a>
                  <img
                    src="https://i.imgur.com/1XrvJJL.png"
                    title="source: imgur.com"
                    style={{ width: '2.5rem' }}
                  />
                </a>
              </div>
            </header>
            <Tabs />
            <main className={header.main}>
              <span>Conteúdo Principal da Loja</span>
            </main>
            <footer
              style={{
                backgroundColor: footerBackgroundColor,
                color: footerColor,
              }}
              className={header.footer}
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
