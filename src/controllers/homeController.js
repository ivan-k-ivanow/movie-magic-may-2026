import { Router } from 'express';
import movieService from '../services/movieService.js';

const homeController = Router();

homeController.get('/', async (req, res) => {
    const movies = await movieService.getAll();

    res.render('home', { layout: 'main', movies });
});

homeController.get('/about', (req, res) => {
    console.log(req.user);
    res.render('about', { layout: 'main' });
});

export default homeController;