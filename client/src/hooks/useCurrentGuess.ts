import { useReducer } from "react";
import { Action } from "../types/recydleTypes";

const createReducer = (wordLength: number) => {
    return (state: string, action: Action): string => {
        if (action.type === 'add') {
            if (state.length === wordLength) {
                return state;
            }
            return state + action.letter;
        }
        if (action.type === 'Backspace') {
            if (state.length !== 0) {
                return state.substring(0, state.length - 1);
            }
        }
        if (action.type === 'clear') {
            return '';
        }
        return state;   
    };
};

export const useCurrentGuessReducer = (wordLength: number) => {
    return useReducer(createReducer(wordLength), '');
};