document.getElementById('recommend-btn').addEventListener('click', function() {
    document.getElementById('genre-select').style.display = 'block';
});

document.getElementById('random-recommend-btn').addEventListener('click', function() {
    // Sembunyikan opsi untuk memilih genre
    document.getElementById('genre-select').style.display = 'none';
    
    fetch('/movies')
    .then(response => response.json())
    .then(data => {
        const randomMovies = getRandomMovies(data, 5); // Mengambil 5 film secara acak
        showMovies(randomMovies);
        // document.getElementById('recommendations').style.display = 'block';
    });
});

document.getElementById('genre').addEventListener('change', function() {
    const selectedGenre = this.value;
    fetch('/recommend', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `genre=${selectedGenre}`,
    })
    .then(response => response.json())
    .then(data => {
        showMovies(data);
        // document.getElementById('recommendations').style.display = 'block';
    });
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

// Ambil data film saat halaman dimuat
fetch('/movies')
.then(response => response.json())
.then(data => {
    showMovies(data);
});
