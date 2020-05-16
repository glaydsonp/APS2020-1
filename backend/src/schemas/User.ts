import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
    name: string,
    email: string,
    phoneNumber: string,
    password: string,
    role: string
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