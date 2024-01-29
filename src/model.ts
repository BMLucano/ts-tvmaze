import { IShow, IShowAndScore, IEpisode } from "./interfaces";

const MISSING_IMAGE_URL = "https://tinyurl.com/missing-tv";
const TVMAZE_API_URL = "https://api.tvmaze.com";

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function searchShowsByTerm(term: string): Promise<IShow[]> {
  const searchParams: URLSearchParams = new URLSearchParams({ q: term });
  const resp =
    await fetch(`${TVMAZE_API_URL}/search/shows?${searchParams}`);
  const showData = await resp.json();

  console.log("resp and showData:", resp, showData);

  return showData.map((scoreAndShow: IShowAndScore) => {
    const show = scoreAndShow.show;
    return {
      id: show.id,
      name: show.name,
      summary: show.summary,
      image: show.image
        ? show.image.medium
        : MISSING_IMAGE_URL
    };
  });

  // console.log('IShowData', IShowData);
  // return IShowData;


}


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id: number): Promise<IEpisode[]> {
  console.log("id", id);
  const response = await fetch(`${TVMAZE_API_URL}/shows/${id}/episodes`);
  const result: IEpisode[] = await response.json();
  // return result.map((episode: IEpisode) => {
  //   return {
  //     id: episode.id,
  //     name: episode.name,
  //     season: episode.season,
  //     number: episode.number
  //   };
  // });

  return result.map(({id, name, season, number}) => {
    return {
      id,
      name,
      season,
      number
    };
  });

  // console.log('IEpisodeData', IEpisodeData);
  // return IEpisodeData;
}


export {
  searchShowsByTerm,
  getEpisodesOfShow,
  TVMAZE_API_URL,
  MISSING_IMAGE_URL,
};
