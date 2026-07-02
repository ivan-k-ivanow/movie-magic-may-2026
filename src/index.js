import express from 'express';
import { engine } from 'express-handlebars';

const app = express();

// Setup handlebars
app.engine('hbs', engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

// Setup static files
app.use(express.static('src/public'));

app.get('/', (req, res) => {
    res.render('home', { layout: 'main',title: 'Movie Magic' });
});

app.get('/about', (req, res) => {
    res.render('about', { layout: 'main', title: 'About' });
});


app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'));