export type recyclingmethod = {
    id: number,
    title: string,
    description: string,
    isFree: boolean,
    infoPageUrl: string,
}

export type wastetypes = {
    id: number,
    title: string,
    description: string,
    informationPageUrl: string,
}

export type searchResult = {
    id: number,
    title: string,
    synonyms: string[],
    notes: string,
    additionalInfo: string,
    wasteTypes: wastetypes[],
    recyclingMethods: recyclingmethod[],
}

export type wastpage = {
    id: number,
    title: string,
    synonyms: string[],
    notes: string,
    additionalInfo: string,
    wasteTypes: wastetypes[],
    recyclingMethods: recyclingmethod[],
}

export type leaderboard = {
    ranking: number,
    name: string,
    points: number
}

export type WasteSearchBarProps = {
onSearch?: (hits: wastpage[], page: number) => void;
  page?: number; // current page (optional)
  onPageChange?: (newPage: number) => void;
};

