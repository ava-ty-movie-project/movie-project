(async () => {

// Global Variables ////////////////////////////////////////

    const favoriteRow = document.querySelector('.favorite-row');
    const contentRow = document.querySelector('.content-row');
    const popularRow = document.querySelector('.popular-row');
    const userInput = document.querySelector('#search-box');
    const searchRow = document.querySelector('.search-container');
    const searchBtn = document.querySelector('#search-btn');
    const searchContainer = document.querySelector('.search-container');
    const hideSearch = document.querySelectorAll('.hide-search');
    const searchButtonRow = document.querySelector('.search-button-row')


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

    function getSearchMovies() {
        const userSearch = userInput.value;
        const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURI(userSearch)}`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${MOVIE_BEARER_TOKEN}`
            }
        }
        return fetch(url, options).then((response) => {
            return response.json();
        }).catch(error => {
            console.log(error);
        })
    }

    function getPopularMovies() {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${MOVIE_TOKEN}`
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

    function renderPopularMovies(movies) {
        for (let result of movies.results) {
            const movieData = document.createElement('div');
            movieData.classList.add('content-card');

            movieData.innerHTML = `
            <div class="card grab-test">
                <div class="grab-inner">
                    <div class="card-front d-flex flex-column">
                        <img class="poster" src="https://image.tmdb.org/t/p/w185/${result.poster_path}" alt="Not Found" onerror="this.src='img/movie-poster-placeholder.jpeg';">
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
            popularRow.appendChild(movieData);
            let addButton = movieData.querySelector('.add-btn')
            addButton.addEventListener('click', () => {
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
                        <img class="poster" src="https://image.tmdb.org/t/p/w185/${result.poster_path}" alt="Not Found" onerror="this.src='img/movie-poster-placeholder.jpeg';">
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
            addButton.addEventListener('click', () => {
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

        searchButtonRow.innerHTML = `
            <button class="search-close-button" type="button">Home</button>
        `
        const searchButton = document.querySelector('.search-close-button')
        searchButton.addEventListener('click', () => {
            // console.log("hi")
            searchContainer.classList.add('hidden');
            for (let row of hideSearch) {
                row.classList.remove('hidden');
            }
            searchButtonRow.classList.add('hidden');
        })
    }

    function renderMovies(movies) {
        for (let result of movies.results) {
            const movieData = document.createElement('div');
            movieData.classList.add('content-card');

            movieData.innerHTML = `
            <div class="card grab-test">
                <div class="grab-inner">
                    <div class="card-front d-flex flex-column">
                        <img class="poster" src="https://image.tmdb.org/t/p/w185/${result.poster_path}" alt="Not Found" onerror="this.src='img/movie-poster-placeholder.jpeg';">
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
            addButton.addEventListener('click', () => {
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
                    <img class="poster" src="https://image.tmdb.org/t/p/w185/${movie.poster_path}" alt="Not Found" onerror="this.src='img/movie-poster-placeholder.jpeg';">
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
            const editButton = favorite.querySelector('.edit-btn');
            editButton.addEventListener('click', () => {

                let firstPrompt = parseFloat(prompt('Please rate this movie:'))
                if (firstPrompt > 10) {
                    alert('Must be a number between 1 and 10')
                }
                if (!isNaN(firstPrompt)) {
                    console.log(firstPrompt)
                    let editObject = {'rating': `${firstPrompt}`}
                    let editPoster = {'poster_path': `${movie.poster_path}`}

                    location.reload();
                    return editFavorites(movie, editObject, editPoster);
                } else {
                    alert('Must be a number between 1 and 10')
                }
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

    function editFavorites(movie, editObject, editPoster) {
        const url = `http://localhost:3000/favorites/${movie.id}`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'tmbdId': `${movie.id}`,
                'title': `${movie.title}`,
                'rating': `${editObject.rating}`,
                'poster_path': `${editPoster.poster_path}`
            })
        }


        fetch(url, options).then((response) => {
            return response.json();

        }).catch(error => {
            console.log(error)
        })

    }

//Events
    // allows you to submit the search by pressing the enter key
    userInput.addEventListener('keyup', (e) => {
        if (e.code === 'Enter') {
            getSearchMovies().then((results) => {
                renderSearchMovies(results)
            })
        }
    })

    // submits the search by clicking the "go" button
    searchBtn.addEventListener('click', () => {
        getSearchMovies().then((results) => {
            renderSearchMovies(results)
        })
    })

    // hides the content besides the navbar and the searched movies
    userInput.addEventListener('keyup', (e) => {
        if (e.code === 'Enter') {
            for (let row of hideSearch) {
                row.classList.add('hidden');
            }
        }
    })

    // getting the discover movies on page load
    getMovies().then((movies) => {
        renderMovies(movies);
    }).catch(error => {
        console.log(error)
    });

    // getting popular movies on page load
    getPopularMovies().then((data) => {
        // console.log(data);
        renderPopularMovies(data);
    }).catch(error => {
        console.log(error)
    });

    // getting favorite movies on page load
    getFavorites().then((favData) => {
        renderFavorites(favData);
    }).catch(error => {
        console.log(error);
    });


//////// End of Iffy /////////////////////////////////////////////////////////////////////////////////

})();