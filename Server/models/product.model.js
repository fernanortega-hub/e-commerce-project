const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({ 
    name: {
        type: String,
        required: true,
        unique: true
    },
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    cost: {
        type: Number,
        required: true,  
    },
    categories: [{ 
        type: Schema.Types.ObjectId,
        ref: 'category'   
    }],
    description: String
}, {
    timestamps: true,
    toJSON: function(doc, ret) {
        delete ret.__v
    }
})

const ProductModel = mongoose.model('product', ProductSchema);
module.exports = ProductModel;