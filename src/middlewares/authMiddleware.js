export function authMiddleware(req, res, next) {
    
    console.log('Auth middleware' + req.url);

    next();
}