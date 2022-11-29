const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

const CategoryModel = mongoose.model('categories', CategorySchema);

module.exports = CategoryModel;