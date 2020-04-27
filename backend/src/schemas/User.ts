import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
    name: String,
    email: String,
    phoneNumber: String,
    password: String,
    role: String
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: String
}, {
    timestamps: true
})

export default model<IUser>('User', UserSchema)