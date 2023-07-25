(async() => {

// Global Variables ////////////////////////////////////////

const favoriteRow = document.querySelector('.favorite-row');
const contentRow = document.querySelector('.content-row');
const movieCard = document.querySelector('.content-card');



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
    const url = `https://api.themoviedb.org/3/collection/collection_id/images?api_key=${MOVIE_TOKEN}`;
    const options = {
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    return fetch (url, options).then((response) => {
        return response.json();
    }).catch(error => {
        console.log(error);
    })
}

function renderImages() {

}
function renderMovies(movies) {

        for (let movie of movies.results) {
            const movieData = document.createElement('div');
            movieData.classList.add('content-card');

            movieData.innerHTML = `
           <div class="card grab-test">
            <div class="grab-inner">
                <div class="card-front">
                    <p>${movie.title}</p>
                    <button class="flip-btn-back">Flip</button>
                </div>
                <div class="card-back">
                    <p>Back Side</p>
                    <button class="flip-btn-front">Flip</button>
                </div>
            </div>
         </div>

        
    `
            contentRow.appendChild(movieData);

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
                </div>
            </div>
         </div>
        `;
        favoriteRow.appendChild(favorite);
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

function addToFavorites() {
    const contentCard = document.querySelector('.content-card');
    const addFavorite = contentCard.querySelector('add-btn');
    addFavorite.addEventListener('click', ()=> {
        favoriteRow.appendChild(contentCard);

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









getMovies().then((movies) => {

console.log(movies);
renderMovies(movies);





}).catch(error => {
    console.log(error)
})







    // removeFromFavorites();

    getFavorites().then((favData) => {
    console.log(favData);

    renderFavorites(favData);


    getImages().then((movieData) => {
        console.log(movieData);
    })

//////// End of Iffy /////////////////////////////////////////////////////////////////////////////////
    }).catch(error => {
        console.log(error);

});




})();