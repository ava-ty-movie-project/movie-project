(async() => {

// Global Variables ////////////////////////////////////////

const favoriteRow = document.querySelector('.favorite-row');
const contentRow = document.querySelector('.content-row');
const userInput = document.querySelector('#search-box');
const searchRow = document.querySelector('.search-container');
const searchBtn = document.querySelector('#search-btn');
const searchContainer = document.querySelector('.search-container');



// Functions ///////////////////////////////////////////////

function getMovies() {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${MOVIE_TOKEN}`
    const options = {
        method: 'GET',
        header: {
            'Content-Type': 'application/json',
        }
    }

    return fetch(url, options).then((response) => {
        return response.json();
    }).catch(error => {
        console.log(error);
    })
}

function getImages() {
    const url = `https://api.themoviedb.org/3/movie/1/images`;
    const options = {
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${MOVIE_BEARER_TOKEN}`
        }
    }
    return fetch (url, options).then((response) => {
        return response.json();
    }).catch(error => {
        console.log(error);
    })
}

function getSearchMovies() {
    const userSearch = userInput.value;
    console.log(userSearch)
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURI(userSearch)}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${MOVIE_BEARER_TOKEN}`
        }
    }
    return fetch (url, options).then((response) => {
        return response.json();
    }).catch(error => {
        console.log(error);
    })
}
function renderSearchMovies(movies) {
    searchContainer.innerHTML = '';
        for (let result of movies.results) {
            const searchData = document.createElement('div');
            searchRow.classList.remove('hidden');
            searchRow.classList.add('search-wrap');

            searchData.innerHTML = `
            <div class="card search-card grab-test">
                <div class="grab-inner d-flex">
                    <div class="card-front d-flex flex-column">
                        <img class="poster" src="https://image.tmdb.org/t/p/w185/${result.poster_path}" alt="movie poster">
                        <button class="submitBtn flip-btn-back">Details<svg fill="white" viewBox="0 0 448 512" height="1em" class="arrow"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>
                        </button>
                    </div>
                    <div class="card-back">
                        <button class="flip-btn-front">X</button>
                        <p>${result.title}</p>
                        <p>Rating: ${result.vote_average}</p>
                        <button class="add-btn">+</button>
                    </div>
                </div>
            </div>
            `;
            searchRow.appendChild(searchData);
            let addButton = searchData.querySelector('.add-btn')
            addButton.addEventListener('click', ()=> {
                let favoriteResult = {
                    "tmdbId": result.id,
                    "title": result.title,
                    "rating": result.vote_average,
                    "poster_path": result.poster_path
                }
                console.log(favoriteResult);
                addToFavorites(favoriteResult)
                location.reload();
            })

            searchData.querySelector(".flip-btn-back").addEventListener("click", () => {
                const test = searchData.querySelector(".grab-test");
                test.classList.add('test');
                const inner = searchData.querySelector(".grab-inner");
                inner.classList.add('card-inner');
            })

            searchData.querySelector(".flip-btn-front").addEventListener("click", () => {
                const removeClass = searchData.querySelector(".grab-test");
                removeClass.classList.remove('test');
                const removeInnerClass = searchData.querySelector(".grab-inner");
                removeInnerClass.classList.remove('card-inner');
            })
        }
    }
function renderMovies(movies) {
        for (let result of movies.results) {
            const movieData = document.createElement('div');
            movieData.classList.add('content-card');

            movieData.innerHTML = `
            <div class="card grab-test">
                <div class="grab-inner">
                    <div class="card-front d-flex flex-column">
                        <img class="poster" src="https://image.tmdb.org/t/p/w185/${result.poster_path}" alt="movie poster">
                        <button class="submitBtn flip-btn-back">Details<svg fill="white" viewBox="0 0 448 512" height="1em" class="arrow"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>
                        </button>
                    </div>
                    <div class="card-back">
                        <button class="flip-btn-front">X</button>
                        <p>${result.title}</p>
                        <p>Rating: ${result.vote_average}</p>
                        <button class="add-btn">+</button>
                    </div>
                </div>
            </div>
            `;
            contentRow.appendChild(movieData);
            let addButton = movieData.querySelector('.add-btn')
            addButton.addEventListener('click', ()=> {
                let favoriteResult = {
                    "tmdbId": result.id,
                    "title": result.title,
                    "rating": result.vote_average,
                    "poster_path": result.poster_path
                }
                console.log(favoriteResult);
                addToFavorites(favoriteResult)
                location.reload();
            })

            movieData.querySelector(".flip-btn-back").addEventListener("click", () => {
                const test = movieData.querySelector(".grab-test");
                test.classList.add('test');
                const inner = movieData.querySelector(".grab-inner");
                inner.classList.add('card-inner');
            })

            movieData.querySelector(".flip-btn-front").addEventListener("click", () => {
                const removeClass = movieData.querySelector(".grab-test");
                removeClass.classList.remove('test');
                const removeInnerClass = movieData.querySelector(".grab-inner");
                removeInnerClass.classList.remove('card-inner');
            })
        }

}
function getFavorites() {
    const url = `http://localhost:3000/favorites`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return fetch(url, options).then((response) => {
        return response.json();

    }).catch(error => {
        console.log(error)
    })

}
function renderFavorites(favorites) {
    for (let movie of favorites) {
        const favorite = document.createElement('div');
        favorite.classList.add('content-card');

        favorite.innerHTML = `
        <div class="card grab-test">
            <div class="grab-inner">
                <div class="card-front d-flex flex-column">
                    <img class="poster" src="https://image.tmdb.org/t/p/w185/${movie.poster_path}" alt="movie poster">
                    <button class="submitBtn flip-btn-back">Details<svg fill="white" viewBox="0 0 448 512" height="1em" class="arrow"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-1.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>
                     </button>
                </div>
                <div class="card-back">
                    <button class="flip-btn-front">X</button>
                    <p>${movie.title}</p>
                    <p>Rating: ${movie.rating}</p>
                    <button class="remove-btn">-</button>
                    <button class="edit-btn">Edit</button>
                </div>
            </div>
         </div>
        `;
        favoriteRow.appendChild(favorite);
        let removeButton = favorite.querySelector('.remove-btn');
        removeButton.addEventListener('click', () => {
            removeFromFavorites(movie.id);
            location.reload();
        });
        favorite.querySelector(".flip-btn-back").addEventListener("click", () => {
            const test = favorite.querySelector(".grab-test");
            test.classList.add('test');
            const inner = favorite.querySelector(".grab-inner");
            inner.classList.add('card-inner');
        })

        favorite.querySelector(".flip-btn-front").addEventListener("click", () => {
            const removeClass = favorite.querySelector(".grab-test");
            removeClass.classList.remove('test');
            const removeInnerClass = favorite.querySelector(".grab-inner");
            removeInnerClass.classList.remove('card-inner');
        })
        }
    }

function addToFavorites(movie) {
    const url = `http://localhost:3000/favorites/`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    };

    return fetch(url, options).then((response) => {
        return response.json();

    }).catch(error => {
        console.log(error)
    })

}
function removeFromFavorites(id) {
    const url = `http://localhost:3000/favorites/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return fetch(url, options).then((response) => {
        return response.json();

    }).catch(error => {
        console.log(error)
    })
}
function editFavorites() {
    const url = `http://localhost:3000/favorites`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    };




    return fetch(url, options).then((response) => {
        return response.json();

    }).catch(error => {
        console.log(error)
    })

}

//Events
    userInput.addEventListener('keyup', (e)=> {
        if(e.code === 'Enter') {
            getSearchMovies().then((results) => {
                renderSearchMovies(results)
            })
        }
    })

    searchBtn.addEventListener('click', () => {
        getSearchMovies().then((results) => {
            renderSearchMovies(results)
        })
    })

    getMovies().then((movies) => {
    // console.log(movies);
    renderMovies(movies);
    }).catch(error => {
    console.log(error)
    })


    getFavorites().then((favData) => {
    // console.log(favData);
    renderFavorites(favData);





    getImages().then((movieData) => {
        // console.log(movieData);
    })
    }).catch(error => {
        console.log(error);

//////// End of Iffy /////////////////////////////////////////////////////////////////////////////////

});
})();