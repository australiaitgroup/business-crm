import { Schema, model, models, InferSchemaType } from 'mongoose';
import { z } from 'zod';

export const USER_ROLES = ['sales', 'manager', 'cs', 'admin'] as const;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: USER_ROLES, required: true },
  deletedAt: { type: Date, default: null }
}, { timestamps: true });

export type User = InferSchemaType<typeof UserSchema>;

export const UserModel = models.User || model<User>('User', UserSchema);

export const UserDto = z.object({
  name: z.string(),
  email: z.string().email(),
  role: z.enum(USER_ROLES)
});
export type UserDto = z.infer<typeof UserDto>;
