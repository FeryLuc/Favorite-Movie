const addMovieModal = document.getElementById('add-modal');
const startAddMovieBtn = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieBtn = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs= addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');


const movies = [];

function showMovieModal() {
    addMovieModal.classList.add('visible');
    toggleBackdrop();
}
function toggleBackdrop() {
    backdrop.classList.toggle('visible');
}
function clearMovieInputs() {
    for (const userInput of userInputs) {
        userInput.value = '';
    }
}
function updateUI() {
    if (movies.length === 0) {
        entryTextSection.style.display ='block';
    } else {
        entryTextSection.style.display ='none';
    }
}
function closeMovieModal() {
    addMovieModal.classList.remove('visible');
}
function renderNewMovieElement(movieObj) {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${movieObj.image}" alt="${movieObj.title}">
        </div>
        <div class="movie-element__info">
            <h2>${movieObj.title}</h2>
            <p>${movieObj.rating}/5 stars</p>
        </div>
    `;
    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, movieObj.id));
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
}
function deleteMovie(movieId) {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    
    closeMovieDeletionModal();
    updateUI();
}
function closeMovieDeletionModal() {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
}
function backdropClickHandler() {
    closeMovieModal();
    closeMovieDeletionModal();
    clearMovieInputs();
}
function cancelAddMovieHandler() {
    closeMovieModal();
    toggleBackdrop();
    clearMovieInputs();
}
function deleteMovieHandler(movieId) {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
    const cancelDeletionBtn = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletionBtn = deleteMovieModal.querySelector('.btn--danger');

    confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));
    confirmDeletionBtn = deleteMovieModal.querySelector('.btn--danger');

    cancelDeletionBtn.removeEventListener('click', closeMovieDeletionModal);
    
    cancelDeletionBtn.addEventListener('click', closeMovieDeletionModal);
    confirmDeletionBtn.addEventListener('click', deleteMovie.bind(null, movieId));
    
}
function addMovieHandler() {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (titleValue.trim() === '' || imageUrlValue.trim() === '' || ratingValue.trim() === '' || +ratingValue < 1 || +ratingValue > 5) {
        alert('Please enter a valid values (rating between 1 and 5).');
        return;
    }

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };

    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    toggleBackdrop();
    clearMovieInputs();
    renderNewMovieElement(newMovie);
    updateUI();
}


startAddMovieBtn.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieBtn.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieBtn.addEventListener('click', addMovieHandler);