const isAuthenticated = (req, res, next) => {
    // console.log('req.user -> ', req.user);
    if (!req.user) {
        return res.status(401).json('Usuario no autenticado');
    }
    return next();
};

// const isAdmin = (req, res, next) => {
//     if(req.user.role === 'ADMIN') {
//         return next();
//     }
//     return res.status(403).json('Acceso prohibido')
// }

module.exports = {
    isAuthenticated,
    // isAdmin,
};
