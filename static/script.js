document.getElementById('recommend-btn').addEventListener('click', function() {
    // Sembunyikan opsi untuk memilih genre
    document.getElementById('genre-select').style.display = 'block';
    
    fetch('/movies')
    .then(response => response.json())
    .then(data => {
        showMovies(data);
    });
});
document.getElementById('random-recommend-btn').addEventListener('click', function() {
    // Sembunyikan opsi untuk memilih genre
    document.getElementById('genre-select').style.display = 'none';
    
    fetch('/movies')
    .then(response => response.json())
    .then(data => {
        const topRatedMovies = data.filter(movie => movie.Rating === 5); // Filter film-film dengan rating bintang 5
        showMovies(topRatedMovies);
        // document.getElementById('recommendations').style.display = 'block';
    });
});


document.getElementById('genre').addEventListener('change', function() {
    const selectedGenre = this.value;
    if (selectedGenre === 'Semua') {
        fetch('/movies')
        .then(response => response.json())
        .then(data => {
            showMovies(data);
        });
    } else {
        fetch('/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `genre=${selectedGenre}`,
        })
        .then(response => response.json())
        .then(data => {
            // Urutkan film secara descending berdasarkan rating
            const sortedMovies = data.sort((a, b) => b.Rating - a.Rating);
            showMovies(sortedMovies);
        });
    }
});


// Fungsi untuk menampilkan film
function showMovies(movies) {
    const moviesContainer = document.getElementById('movies-container');
    moviesContainer.innerHTML = '';
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${movie.Film}</h3>
            <p>Genre: ${movie.Genre}</p>
            <p>Studio: ${movie['Lead Studio']}</p>
            <p>Year: ${movie.Year}</p>
            <div class="rating-container">
                ${getStarRating(movie.Rating)}
            </div>
        `;
        moviesContainer.appendChild(card);
    });
}

// Fungsi untuk memilih film secara acak dari array film
function getRandomMovies(movies, num) {
    const randomMovies = [];
    const numMovies = Math.min(num, movies.length);
    const indexes = [];
    while (indexes.length < numMovies) {
        const randomIndex = Math.floor(Math.random() * movies.length);
        if (!indexes.includes(randomIndex)) {
            indexes.push(randomIndex);
            randomMovies.push(movies[randomIndex]);
        }
    }
    return randomMovies;
}

// Fungsi untuk mendapatkan tampilan bintang rating berdasarkan jumlah bintang
function getStarRating(rating) {
    const roundedRating = Math.round(rating);
    let starsHTML = '';
    for (let i = 0; i < roundedRating; i++) {
        starsHTML += '<span class="full">&#9733;</span>';
    }
    if (rating > roundedRating) {
        starsHTML += '<span class="half">&#9733;</span>';
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
        starsHTML += '<span>&#9734;</span>';
    }
    return starsHTML;
}

// Ambil data film saat halaman dimuat
fetch('/movies')
.then(response => response.json())
.then(data => {
    showMovies(data);
});
