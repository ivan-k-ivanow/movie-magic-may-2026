import fs from 'fs/promises';
import { prisma } from '../lib/prisma.js';


async function getAll(filter = {}) {
    let movies = await prisma.movie.findMany();

    // TODO: Implement database filtering instead of filtering in memory for better performance
    // Partial case insensitive search
    if (filter.search) {
        movies = movies.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()));
    }

    // Exact Search
    if (filter.year) {
        movies = movies.filter(movie => movie.year === filter.year);
    }

    // Partial case insensitive search
    if (filter.genre) {
        movies = movies.filter(movie => movie.genre.toLowerCase().includes(filter.genre.toLowerCase()));
    }
    return movies;
};

async function getById(movieId) {
    const movie = await prisma.movie.findUnique({
        where: {
            id: movieId
        }
    });

    if (!movie) {
        throw new Error('No movie found!');
    }

    return movie;
}

async function create(movieData) {
    const movies = await prisma.movie.create({
        data: movieData,
    });

    return movies;
}

const movieRepository = {
    getAll,
    create,
    getById
};

export default movieRepository;