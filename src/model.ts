const MISSING_IMAGE_URL = "https://tinyurl.com/missing-tv";
const TVMAZE_API_URL = "https://api.tvmaze.com/";

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */
interface IShow {
  id: number;
  name: string;
  summary: string;
  image: string;
}

async function searchShowsByTerm(term: string): Promise<IShow[]> {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  const searchParams: URLSearchParams = new URLSearchParams({ q: term });

  const resp: Response = await fetch(`${TVMAZE_API_URL}/search/shows?${searchParams}`);
  const showData = await resp.json();

  console.log("resp and showData:", resp, showData);

  return showData.map((scoreAndShow:IShow)  => {

    return {
      id: scoreAndShow.id,
      name: scoreAndShow.name,
      summary: scoreAndShow.summary,
      image: scoreAndShow.image
        ? scoreAndShow.image
        : MISSING_IMAGE_URL
    };
  });


}


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) {
}


export {
  searchShowsByTerm,
  getEpisodesOfShow,
  TVMAZE_API_URL,
  MISSING_IMAGE_URL,
};
