import movieRepository from '../repositories/movieRepository.js';

async function getAll() {
    return movieRepository.getAll();
}

const movieService = {
    getAll
};

export default movieService;