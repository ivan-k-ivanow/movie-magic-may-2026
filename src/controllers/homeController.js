import { Router } from 'express';
import movieService from '../services/movieService.js';

const homeController = Router();

homeController.get('/', async (req, res) => {
    const movies = await movieService.getAll();

    res.render('home', { layout: 'main', pageTitle: 'Home Page', movies });
});

homeController.get('/about', (req, res) => {
    res.render('about', { layout: 'main', pageTitle: 'About' });
});

export default homeController;