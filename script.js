const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// initially get five movies
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    // console.log(respData);
    
   // show respData.results im show movies function
    showMovies(respData.results);
}

// function showMovies got a prameter movies
function showMovies(movies) {
    // clear main
    main.innerHTML = "";

// for each movie get poster_path, title, vote_average from respData

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, release_date } = movie;
        //  create a new div 
        const movieEl = document.createElement("div");

        
        // add class movie from CSS to movieEl

        movieEl.classList.add("movie");
            
        movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span 
                    vote_average
                >${vote_average}</span>
            </div>
            <div class="date">
               <span>Relase date : &nbsp</span>  ${ release_date}
            </div>
            
        `;

        // append movieEl to main

        main.appendChild(movieEl);
    });
}



form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    // if searchTerm true get SearchApi + search term
    if (searchTerm) {
        getMovies(  SEARCHAPI + searchTerm);

        search.value = "";
    }
    });
