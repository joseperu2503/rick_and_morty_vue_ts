export interface GetAllLocartionsInterface {
  info: Info;
  results: Location[];
}

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: null;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: Date;
}

export const initLocation = {
  id: 0,
  name: "",
  type: "",
  dimension: "",
  residents: [],
  url: "",
  created: new Date(),
};
