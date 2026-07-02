import { Router } from 'express';
import { getAllMovies } from '../repositories/movieRepository.js';

const homeController = Router();

homeController.get('/', async (req, res) => {

    const movies = await getAllMovies();

    console.log(movies);

    res.render('home', { layout: 'main',title: 'Movie Magic' });
});

homeController.get('/about', (req, res) => {
    res.render('about', { layout: 'main', title: 'About' });
});

export default homeController;