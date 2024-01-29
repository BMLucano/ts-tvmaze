import $ from 'jquery';
import { getEpisodesOfShow, searchShowsByTerm } from "./model.ts";
import { IShow, IEpisode } from './interfaces.ts';

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $episodesList = $("#episodesList");
const $searchForm = $("#searchForm");


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows: IShow[]): void {
  $showsList.empty();
  // const x = "https://static.tvmaze.com/" +
  //   "uploads/images/medium_portrait/160/401704.jpg"
  for (let show of shows) {
    const $show = $(
      `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img
              src=${show.image}
              alt=${show.name}
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
       </div>
      `
    );

    $showsList.append($show);
  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val() as string;
  const shows = await searchShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Takes as input an array of episodes {id, name, season, number}
 * appends episodes to the episode list element in the DOM and returns nothing
 */

function populateEpisodes(episodes: IEpisode[]): void {
  $episodesArea.show();
  episodes.map(episode => {
    $episodesList.append(
      `
      <li> ${episode.name} (season ${episode.season},
         number${episode.number})
      </li>
      `
    );
  });
}

/** Takes as input an JQuery.ClickEvent, gets the list of episodes for
 * the show closest to the episode list button clicked, and adds those
 * episodes to the DOM.
 */

async function getEpisodesThenDisplay(evt: JQuery.ClickEvent): Promise<void> {
  evt.preventDefault();
  $episodesList.empty();
  console.log("we clicked here");
  const id = $(evt.target!).closest('.Show').data("show-id");
  const episodes = await getEpisodesOfShow(id);
  populateEpisodes(episodes);
}

$showsList.on("click", ".Show-getEpisodes", getEpisodesThenDisplay);