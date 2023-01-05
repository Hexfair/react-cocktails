import { RootState } from "../store";
//=========================================================================================================================

export const selectorGlassesList = (state: RootState) => state.glasses.glassesList;
export const selectorGlasses = (state: RootState) => state.glasses;
