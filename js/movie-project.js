(async() => {

// Global Variables ////////////////////////////////////////

const favoriteRow = document.querySelector('.favorite-row');
const contentRow = document.querySelector('.content-row');
const movieCard = document.querySelector('.content-card');
const userInput = document.querySelector('#search-box');
const searchRow = document.querySelector('.search-container');



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

// function getImages() {
//     const url = `https://api.themoviedb.org/3/collection/collection_id/images?api_key=${MOVIE_TOKEN}`;
//     const options = {
//         method:'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     }
//     return fetch (url, options).then((response) => {
//         return response.json();
//     }).catch(error => {
//         console.log(error);
//     })
// }

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
    for (let result of movies.results) {
        const searchData = document.createElement('div');
        searchData.classList.remove('hidden');

        searchData.innerHTML = `
            <div class="card grab-test">
                <div class="grab-inner">
                    <div class="card-front">
                        <p>${result.title}</p>
                        <button class="flip-btn-back">Flip</button>
                    </div>
                    <div class="card-back">
                        <p>Back Side</p>
                        <button class="flip-btn-front">Flip</button>
                        <button class="add-btn">Add</button>
                    </div>
                </div>
            </div>
            `;
        searchRow.appendChild(searchData);
        let addButton = movieData.querySelector('.add-btn')
        addButton.addEventListener('click', ()=> {
            let favoriteResult = {
                "tmdbId": result.id,
                "title": result.title,
                "rating": result.vote_average
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


function renderImages() {

}
function renderMovies(movies) {

        for (let result of movies.results) {
            const movieData = document.createElement('div');
            movieData.classList.add('content-card');

            movieData.innerHTML = `
            <div class="card grab-test">
                <div class="grab-inner">
                    <div class="card-front">
                        <p>${result.title}</p>
                        <button class="flip-btn-back">Flip</button>
                    </div>
                    <div class="card-back">
                        <p>Back Side</p>
                        <button class="flip-btn-front">Flip</button>
                        <button class="add-btn">Add</button>
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
                    "rating": result.vote_average
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
                <div class="card-front">
                    <p>${movie.title}</p>
                    <button class="flip-btn-back">Flip</button>
                </div>
                <div class="card-back">
                    <p>Back Side</p>
                    <button class="flip-btn-front">Flip</button>
                    <button class="remove-btn">Remove</button>
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
        getSearchMovies().then((results) =>{
            renderSearchMovies(results)
        })
    }
})









    getMovies().then((movies) => {
    console.log(movies);
    renderMovies(movies);
    }).catch(error => {
    console.log(error)
    })


    getFavorites().then((favData) => {
    console.log(favData);
    renderFavorites(favData);





    // getImages().then((movieData) => {
    //     console.log(movieData);
    // })
    // }).catch(error => {
    //     console.log(error);

//////// End of Iffy /////////////////////////////////////////////////////////////////////////////////

});
})();