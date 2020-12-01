import {getTok} from './token'
let apiToken = getTok();

export function getFilmsFromApiWithSearchedText (text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiToken + '&language=fr&query=' + text + '&page=' + page
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

export function getImageFromApi(name) {
    return 'https://image.tmdb.org/t/p/w300' + name;
}

export function getFilmDetailFromApi(id) {
    const url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + apiToken + '&language=fr';
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))    
}