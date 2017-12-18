var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/makertap', { useMongoClient: true })

module.exports = mongoose
