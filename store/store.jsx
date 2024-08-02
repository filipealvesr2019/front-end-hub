import { atom } from 'jotai';
import Cookies from 'js-cookie';

export const loggedInAtom = atom(Boolean(Cookies.get('token')));
export const isAdminAtom = atom(Cookies.get('role') === 'administrador');
export const customerIDAtom = atom(null); // Defina o customerIDAtom

export const authErrorAtom = atom(null); // Novo átomo para armazenar erros de autenticação



export const headerBackgroundColorAtom = atom('#ffffff'); // cor inicial
export const headerColorAtom = atom('#000000'); // cor inicial
export const mainBackgroundColorAtom = atom('#f0f0f0'); // cor inicial
export const mainColorAtom = atom('#000000'); // cor inicial
export const footerBackgroundColorAtom = atom('#ffffff'); // cor inicial
export const footerColorAtom = atom('#000000'); // cor inicial