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
function renderMovies(movies) {

        for (let result of movies.results) {
            const movieData = document.createElement('div');
            movieData.classList.add('content-card');

            movieData.innerHTML = `
        <h1>${result.title}</h1>
        <button type="button" class="add-btn">Test</button>
        
    `
            contentRow.appendChild(movieData);
        let addButton = movieData.querySelector('.add-btn')
        addButton.addEventListener('click', ()=> {
            let favoriteResult = result.map({
                "id": result.id,
                "title": result.title,
                "genre": result.genre_ids,
                "rating": result.vote_average
            })
            console.log(favoriteResult);
            addToFavorites(favoriteResult.id)
            location.reload();
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
        <h1>${movie.title}</h1>
        <button type="button" id='${movie.id}' class="remove-btn">Test</button>
        
    `
        favoriteRow.appendChild(favorite);
        let removeButton = favorite.querySelector('.remove-btn');
        removeButton.addEventListener('click', () => {
            removeFromFavorites(movie.id);
            location.reload();
        });
        }
    }
function addToFavorites(id) {
    const url = `http://localhost:3000/favorites/${id}`;
    const options = {
        method: 'POST',
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







(() => {

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


//////// End of Iffy /////////////////////////////////////////////////////////////////////////////////
    }).catch(error => {
        console.log(error);

});




})();