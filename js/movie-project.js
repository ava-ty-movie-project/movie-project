//Global Variables

const favoriteRow = document.querySelector('.favorite-row');





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

function getFavorites() {
    const url = `http://localhost:3000/movies`;
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
function renderFavorites(movies) {

    for (let movie of movies) {
        const favorite = document.createElement('div');
        favorite.classList.add('content-card');

        favorite.innerHTML = `
        <h1>${movie.title}</h1>
        
    `
        favoriteRow.appendChild(favorite);
        }
    }



(() => {

getMovies().then((movies) => {
    console.log(movies);
})

    getFavorites().then((movies) => {
        console.log(movies);
        renderFavorites(movies);






    }).catch(error => {
        console.log(error);

});




})();