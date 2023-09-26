export interface Matrixreservation {
    id:number;
	test:number
}

interface BelongsToCollection {
    backdrop_path: string;
    id: number;
    name: string;
    poster_path: string;
}

interface Genres {
    id: number;
    name: string;
}

interface ProductionCompanies {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

interface ProductionCountries {
    iso_3166_1: string;
    name: string;
}

interface SpokenLanguages {
    iso_3166_1: string;
    name: string;
}
