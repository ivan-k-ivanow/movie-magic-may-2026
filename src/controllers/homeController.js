import { Router } from 'express';
import movieService from '../services/movieService.js';

const homeController = Router();

homeController.get('/', async (req, res) => {
    const movies = await movieService.getAll();

    res.render('home', { layout: 'main', title: 'Movie Magic', movie: movies[0] });
});

homeController.get('/about', (req, res) => {
    res.render('about', { layout: 'main', title: 'About' });
});

export default homeController;