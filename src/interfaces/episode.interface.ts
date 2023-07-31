export interface GetAllEpisodesInterface {
  info: Info;
  results: Episode[];
}

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: null;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: Date;
}

export const initEpisode: Episode = {
  id: 0,
  name: "",
  air_date: "",
  episode: "",
  characters: [],
  url: "",
  created: new Date(),
};
