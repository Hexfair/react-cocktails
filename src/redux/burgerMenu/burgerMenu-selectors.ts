import { RootState } from './../store';
//=========================================================================================================================

export const selectStatusBurgerMenu = (state: RootState) => state.burger.isBurgerMenuOpen;