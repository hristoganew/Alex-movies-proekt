$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        return false;
    });

    $('#list').click(function (event) {
        let searchText = $('#searchText').val();
        getMovies(searchText, 'list');
    });


    $('#grid').click(function (event) {
        let searchText = $('#searchText').val();
        getMovies(searchText, 'grid');
    });
});

function getMovies(searchText, viewType = 'grid') {
    axios.get('http://www.omdbapi.com/?apiKey=31b25297' + '&s=' + searchText + '&r=json').then(response => {
        let movies = response.data.Search;
        let output = '';
        if(viewType == 'grid'){
            $('#movies').addClass('row');
        }

        if(viewType == 'list'){
            $('#movies').removeClass('row');
        }

        $.each(movies, (index, movie) => {
            if(viewType == 'list'){
                output += `
                    <div class="row">
                        <div class="col-md-2">
                            <div class="well text-center">
                                <img src="${movie.Poster}">
                            </div>
                        </div>
                        <div class='col-md-5'><h5>${movie.Title} <br><br>Year - ${movie.Year}</h5></div>
                        <div class='col-md-5'><a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a></div>
                    </div>
               `;
            }


            if(viewType == 'grid'){
                output += `
                    <div class="col-md-3">
                        <div class="well text-center">
                            <img src="${movie.Poster}">
                            <h5>${movie.Title}</h5>
                            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                        </div>
                    </div>
               `;
            }

            $('#movies').html(output);
        });

    })
        .catch(err => {
            console.log(err);
        });
}

function movieSelected(id) {
    getMovie(id);
}

function getMovie(movieId) {

    axios.get('http://www.omdbapi.com?apiKey=31b25297&i=' + movieId)
        .then((response) => {
            let movie = response.data;

            let output = `
            <div class="col-md-4">
              <img src="${movie.Poster}" class="thumbnail">
            </div>
            <div class="col-md-4">
              <h2>${movie.Title}</h2>
              <ul class="list-group">
                <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
              </ul>
            </div>
            <div class="col-md-4">
              <h3>Plot</h3>
              ${movie.Plot}
              <hr>
              <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
              <a href="index.html" class="btn btn-default">Go Back To Search</a>
            </div>
          `;
            $('#movie-details').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}