import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  uid: string;     
  email?: string;
  displayName?: string;
  photoURL?: string;
  providerId?: string;   
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    uid: { type: String, unique: true, index: true, required: true },
    email: { type: String, index: true },
    displayName: String,
    photoURL: String,
    providerId: String,
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);