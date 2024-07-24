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
import { HamburgerIcon, EmailIcon, ExternalLinkIcon, RepeatIcon, CalendarIcon } from '@chakra-ui/icons';

const ExemploMenu = () => {
  return (
    <div className={styles.container}>
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
       
      </MenuList>
    </Menu>

    </div>
  );
};

export default ExemploMenu;
