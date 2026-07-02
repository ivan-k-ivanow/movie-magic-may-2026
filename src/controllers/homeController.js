import { Router } from 'express';

const homeController = Router();

homeController.get('/', (req, res) => {
    res.render('home', { layout: 'main',title: 'Movie Magic' });
});

homeController.get('/about', (req, res) => {
    res.render('about', { layout: 'main', title: 'About' });
});

export default homeController;