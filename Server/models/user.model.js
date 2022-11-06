const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: [true, 'first_name is required']
    }, 
    last_name: {
        type: String,
        required: [true, 'last_name is required']
    }, 
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    role: {
        type: String,
        required: [true, 'role is required'],
        enum: ['admin', 'user'],
        default: 'user'
    }
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.__v;
            delete ret.createdAt;
        }
    }
})

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;