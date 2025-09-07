import { Schema, model, models, InferSchemaType } from 'mongoose';
import { z } from 'zod';

const CustomerSchema = new Schema({
  name: { type: String, required: true },
  key: { type: String, unique: true },
  deletedAt: { type: Date, default: null }
}, { timestamps: true });

CustomerSchema.statics.generateKey = async function(name: string) {
  const base = name.toLowerCase().replace(/\s+/g, '-');
  let key = base;
  let i = 1;
  while (await this.exists({ key })) {
    key = `${base}-${i++}`;
  }
  return key;
};

export type Customer = InferSchemaType<typeof CustomerSchema>;

export const CustomerModel = models.Customer || model<Customer>('Customer', CustomerSchema);

export const CustomerDto = z.object({
  name: z.string(),
  key: z.string().optional()
});
export type CustomerDto = z.infer<typeof CustomerDto>;
