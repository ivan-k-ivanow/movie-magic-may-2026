import { Router } from 'express';
import movieService from '../services/movieService.js';
import artistService from '../services/artistService.js';
import { isAuth } from '../middlewares/authMiddleware.js';
import { createMovieSchema } from '../schemas/movieSchema.js';
import { ZodError } from 'zod';
import * as z from "zod";

const movieController = Router();

movieController.get('/search', async (req, res) => {
    const filter = req.query;

    const movies = await movieService.getAll(filter);

    res.render('movies/search', { movies, filter, pageTitle: 'Search Movies' });
});

movieController.get('/create', isAuth, (req, res) => {
    const categoryOptions = prepareCategoryViewData();

    res.render('movies/create', { categoryOptions });
});

movieController.post('/create', isAuth, async (req, res) => {
    const newMovie = req.body;
    const userId = req.user.id;

    try {
        const movieData = createMovieSchema.parse(newMovie);

        await movieService.create(movieData, userId);

        res.redirect('/');
    } catch (error) {
        let errors = {};
        let errorMessage = null;
        const categoryOptions = prepareCategoryViewData(newMovie);

        if (error.name === 'ZodError') {
            errors = z.flattenError(error).fieldErrors;
        } else if (error.name === 'PrismaClientKnownRequestError') {
            switch (error.code) {
                case 'P2002':
                    errors = { title: ['Title must be unique'] };
                    break;
            }
        } else {
            errorMessage = error.message || 'An unexpected error ocurred';
        }

        res.status(400).render('movies/create', { movie: req.body, error: errorMessage, errors, categoryOptions });
    }
});

// Details page
movieController.get('/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const userId = req?.user?.id;

    const movie = await movieService.getById(movieId);

    const isOwner = movie.userId && movie.userId === userId;



    // Quick and Dirty to prepare view data for the rating stars TODO: fix it
    const ratingStars = '&#x2605;'.repeat(Math.floor(movie.rating));


    res.render('movies/details', { movie, ratingStars, isOwner });
});

movieController.get('/:movieId/attach', isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getById(movieId);
    const artists = await artistService.getAll({ exclude: movie.artists.map(a => a.id) });

    res.render('movies/attach', { movie, artists });
});

movieController.post('/:movieId/attach', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const artistId = req.body.artist;

    await movieService.attachArtist(movieId, artistId);

    res.redirect(`/movies/${movieId}`);
});

movieController.get('/:movieId/delete', isAuth, async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = req.user.id;

    await movieService.remove(movieId, userId);

    res.redirect('/');

});


function prepareCategoryViewData(movie = {}) {
    const categories = ['TV Show', 'Animation', 'Movie', 'Documentary', 'Short-film'];

    const categoryOptions = categories.map(category => {
        const value = category.toLowerCase().replaceAll(' ', '-')

        const option = {
            value,
            label: category,
            selected: movie.category === value,
        };

        return option;
    });

    return categoryOptions;

}

movieController.get('/:movieId/edit', isAuth, async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = req.user.id;

    const movie = await movieService.getById(movieId);

    if (movie.userId !== userId) {
        return res.status(401).send('Unauthorized');
    };

    const categoryOptions = prepareCategoryViewData(movie);


    res.render('movies/edit', { movie, categoryOptions });
});

movieController.post('/:movieId/edit', isAuth, async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = req.user.id;
    const movieData = req.body;

    await movieService.edit(movieId, movieData, userId);

    res.redirect(`/movies/${movieId}`);
});

export default movieController;