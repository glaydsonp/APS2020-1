import { Schema, model, Document } from 'mongoose'

export interface ITFA extends Document {
    email: string,
    codigo: number
}

const TFASchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    codigo: { type: Number, required: false }
}, {
    timestamps: true
})

export default model<ITFA>('TFA', TFASchema)