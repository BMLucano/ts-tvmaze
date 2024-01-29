export interface IShow {
  id: number;
  name: string;
  summary: string;
  image: string;
}

export interface IShowFromAPI{
  id: number;
  name: string;
  summary: string;
  image: {
    medium: string,
    original: string
  };
}


export interface IShowAndScore{
  show: IShowFromAPI
}

export interface IEpisode{
  id: number,
  name: string,
  season: string,
  number: string
}

export interface IEpisodeFromAPI{
  id: number,
  name: string,
  season: string,
  number: string
}
