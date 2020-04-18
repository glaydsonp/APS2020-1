import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
    name: String,
    email: String,
    phoneNumber: String,
    password: String,
    role: String
}, {
    timestamps: true
})

export default model('User', UserSchema)