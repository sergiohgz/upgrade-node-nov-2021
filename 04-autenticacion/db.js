// Connexion con MongoDB
const mongoose = require('mongoose')

const DB_URL = 'mongodb+srv://admin:ErkJSYPERtdQ8B23@cluster0.tyzbb.mongodb.net/concesionario?retryWrites=true&w=majority'

const connectDB = () => mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = { connectDB, DB_URL };
