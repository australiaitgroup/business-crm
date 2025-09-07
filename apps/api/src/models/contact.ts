import { Schema, model, models, InferSchemaType } from 'mongoose';
import { z } from 'zod';

const ContactSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  deletedAt: { type: Date, default: null }
}, { timestamps: true });

export type Contact = InferSchemaType<typeof ContactSchema>;

export const ContactModel = models.Contact || model<Contact>('Contact', ContactSchema);

export const ContactDto = z.object({
  customerId: z.string(),
  name: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional()
});
export type ContactDto = z.infer<typeof ContactDto>;
