// ExemploComponent.js
import React from 'react';
import styles from './NavBar.module.css'
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { HamburgerIcon, EmailIcon, ExternalLinkIcon, AtSignIcon, CalendarIcon } from '@chakra-ui/icons';

const ExemploMenu = () => {
  return (
    <div className={styles.container}>
         <a href="https://imgur.com/eIsbYKG">
              <img
                src="https://i.imgur.com/eIsbYKG.jpg"
                title="source: imgur.com"
                className={styles.img}
              />
            </a>

            <div>

    <Menu>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<HamburgerIcon />}
        variant='outline'
        className={styles.menuButton}
      />
      <MenuList className={styles.menuList}>
        <MenuItem icon={<CalendarIcon />} >
        Planos
        </MenuItem>
        <MenuItem icon={<ExternalLinkIcon />} >
          Sobre nos
        </MenuItem>
        <MenuItem icon={<EmailIcon />} >
          Contato
        </MenuItem>
        <MenuItem icon={<AtSignIcon />} >
          Login 
        </MenuItem>
        <MenuItem icon={<EmailIcon />} >
        Cadastro
        </MenuItem>
      </MenuList>
    </Menu>
            </div>

    </div>
  );
};

export default ExemploMenu;
