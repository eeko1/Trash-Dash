export type LetterState = 'default' | 'wrong' | 'correct' | 'wrong-place';

export type solutionProps = {
    solution: string;
    wordLength: number;
};

export type keyPadProps = {
    onKeyPress: (key: string) => void;
    letterToLetterState: { [letter: string]: LetterState }
};

export type keyProps = {
    letter: string;
    onKeyPress: (key: string) => void;
    letterState: LetterState;
}

export type GameState = {
    puzzleDate: string;
    guesses: Array<string>;
    gameCompletion: 'active' | 'won' | 'lost';
};

export type rowProps = {
    guess: string | undefined;
    letterState: Array<LetterState>;
    wordLength: number;
};
export type tileProps = {
    letter: string | undefined;
    state: LetterState;
    id: number;
}

export type recydleEndProp = {
    result: string;
}

type AddLetterAction = {
    type: 'add';
    letter: string;
}
type BackspaceAction = {
    type: 'Backspace';
}

type ClearAction = {
    type: 'clear';
}

export type Action = AddLetterAction | BackspaceAction | ClearAction