// impor from another js file
import { Games } from './games.js';
import { GameDetails } from './getdetails.js'
// start global variables
const toggle = document.querySelector('.toggle');
const navbar = document.querySelector('.links');
const lightMode = document.querySelector('.mode .light');
const darkMode = document.querySelector('.mode .dark');
let item;
let games = document.querySelector('.games')
let detailGame = document.getElementById('details')
let cancelDetails = document.querySelector('.cancel-details');
let catagcontainer = document.querySelectorAll('main>div');
let links = document.querySelectorAll('.links > a');

// display games function
async function displayGames(catag) {
  //* take instacse from games class come from games.js file and make getGamesCatag method in it
  let catagGames = new Games(catag);
  let data = await catagGames.getGamesCateg();
  //* for loop in catagcontainer and if element of it == catag name ==> upload of data in it
  catagcontainer.forEach((el) => {
    if (el.id == catag) {
      for (let i = 0; i < data.length; i++) {

        let item = `
                <a class="item flex flex-col hover:scale-110 transition-[transform] duration-[1s]  break-words   cursor-pointer  ease-linear grow border-2  border-slate-950 p-8 md:p-3 rounded-lg">
         <img class=" h-[147.76px] object-cover w-full " src="${data[i].thumbnail}" alt="${data[i].title} game">
         <article class="grow mt-3 ">
           <div class="flex justify-between items-center">
             <p class="name capitalize font-extrabold">${data[i].title}</p>
             <span class="font-bold dark:bg-blue rounded-md">free</span>
           </div>
           <p class="descrip mt-8  text-center">${data[i].short_description}</p>
         </article>
         <footer class="flex justify-between items-center gap-2 mt-8 pt-3 border-blue-950 border-t-2">
             <p class="catag bg-slate-900 dark:bg-blue-700  p-2 rounded-md text-white  font-bold" style="font-size:0.8rem;">${data[i].genre}
             </p>
             <p class="media bg-slate-900 dark:bg-blue-700 p-2 rounded-md text-white  font-bold  " style="font-size:0.8rem;">
               ${data[i].platform}</p>
           </footer>
       </a>
           `
        el.innerHTML += item;

      }
      // for loop on items (games) and make event if click in it call the showGame function with its id and remove cancel detais from view
      let items = document.getElementsByClassName('item');
      for (let i = 0; i < items.length; i++) {
        items[i].addEventListener('click', async () => {
          await showGame(data[i].id);
          cancelDetails.classList.remove('hidden');
        })
      }
    }
    // if the catagName not equal to id of elment remove any data from it
    else {
      el.innerHTML = ``;
    }
  })
}
// looping in links and make if click in any link add active class to it and remove from other ,  call displayGames func with get value attribue to put in func
links.forEach((li) => {
  li.addEventListener('click', (e) => {
    e.target.classList.add('active-link');
    displayGames(e.target.getAttribute('value'));

    Array.from(links).map((li) => {
      li.classList.remove('active-link');
    })

  })
});


//display the first catag 
async function firstCatag() {
  await displayGames('mmorpg');
}
firstCatag();


// display game when click in it
// show game 
async function showGame(id) {
  // take an inistance object from class that comes from getdetails.js and make a method in it
  let gameDetails = new GameDetails(id);
  let data = await gameDetails.getGameDetails();
  item = document.getElementsByClassName('item');
      //looping in item and add Event for every item when click in it add hidden class from games sec and remove from detais sec them make item with it is data
  for (let i = 0; i < item.length; i++) {
    item[i].addEventListener('click', () => {
      games.classList.add('hidden');
      detailGame.classList.remove('hidden');
      let item = `
       <div class="container">
        <header class="flex justify-between  mb-12">
          <h2 class="text-4xl font-bold capitalize">details game</h2>
        </header>
        <article class="flex flex-col md:flex-row md:items-start gap-8 ">
          <img src=${data.thumbnail} alt="thumbnail game" class="md:w-1/3">
          <div class="content flex flex-col gap-8 grow">
            <h3 class="capitalize text-[1.8rem]">Title: ${data.title}</h3>
            <div class="category flex gap-4">
              <h4 class="capitalize text-[1.3rem]">category: </h4>
              <p class="text-black bg-blue-400 px-4 py-1 rounded-lg uppercase">${data.genre}</p>
            </div>
            <div class="platform flex gap-4">
              <h4 class="capitalize text-[1.3rem]">platform:</h4>
              <p class="text-black bg-blue-400 rounded-lg px-4 py-1 uppercase">${data.platform}</p>
            </div>
            <div class="category flex gap-4">
              <h4 class="capitalize text-[1.3rem]">status:</h4>
              <p class="text-black bg-blue-400 rounded-lg px-4 py-1 uppercase">${data.status}</p>
            </div>
            <p class="caption indent-2">  ${data.description} </p>
            <a href="${data.game_url}" target="_blank"
              class="self-start hover:bg-yellow-500  hover:text-white cursor-pointer dark:text-white text-yellow-500 p-4 border-yellow-500 border-yellow border-2 rounded-md font-bold capitalize">show  game</a>
          </div>
        </article>
      </div>
   `
      detailGame.innerHTML = item;
    })
  }

}
// when click in elment make function
document.addEventListener('click', (e) => {
  // make lightMode
  if (e.target == darkMode) {
    darkMode.classList.remove('fa-moon');
    lightMode.classList.add('fa-sun');
    document.documentElement.classList.add('dark')
  }
  // make darkMode
  if (e.target == lightMode) {
    darkMode.classList.add('fa-moon');
    lightMode.classList.remove('fa-sun');
    document.documentElement.classList.remove('dark')
  };
  // display navbar
  if (e.target == toggle) {
    navbar.classList.toggle('active');
    navbar.classList.toggle('in-active');
  };
  // cancel details section and show games section
  if (e.target == cancelDetails) {
    games.classList.remove('hidden');
    detailGame.classList.add('hidden');
    cancelDetails.classList.add('hidden')
  }
})