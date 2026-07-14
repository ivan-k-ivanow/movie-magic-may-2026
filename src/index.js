import express from 'express';
import { engine } from 'express-handlebars';
import routes from './routes.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import cookieParser from 'cookie-parser';

const app = express();

// Setup handlebars
app.engine('hbs', engine({
    extname: 'hbs',
    helpers: {
        isSelected() {
            return this.selected ? 'selected' : '';
        }
    }
}));
app.set('view engine', 'hbs');
app.set('views', './src/views'); 

// Setup static files
app.use(express.static('src/public'));

// Setup body parser
app.use(express.urlencoded());

// Setup cookie parser
app.use(cookieParser());

// Auth middleware
app.use(authMiddleware);

// Setup routes
app.use(routes);

// Start the server
app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'));