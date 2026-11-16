export interface Recurso {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;

  species: Recurso;

  sprites: {
    front_default: string | null;

    other?: {
      'official-artwork'?: {
        front_default: string | null;
      };
    };
  };

  types: {
    slot: number;
    type: Recurso;
  }[];

  stats: {
    base_stat: number;
    stat: Recurso;
  }[];
}

export interface EspeciePokemon {
  name: string;

  flavor_text_entries: {
    flavor_text: string;
    language: Recurso;
  }[];

  genera: {
    genus: string;
    language: Recurso;
  }[];

  evolution_chain: {
    url: string;
  } | null;
}

export interface NodoEvolucion {
  species: Recurso;
  evolves_to: NodoEvolucion[];
}

export interface CadenaEvolucion {
  id: number;
  chain: NodoEvolucion;
}