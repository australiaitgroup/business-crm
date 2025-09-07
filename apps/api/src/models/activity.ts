import { Schema, model, models, InferSchemaType } from 'mongoose';
import { z } from 'zod';

const ActivitySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  targetId: { type: Schema.Types.ObjectId },
  meta: { type: Schema.Types.Mixed },
  deletedAt: { type: Date, default: null }
}, { timestamps: true });

export type Activity = InferSchemaType<typeof ActivitySchema>;

export const ActivityModel = models.Activity || model<Activity>('Activity', ActivitySchema);

export const ActivityDto = z.object({
  userId: z.string(),
  action: z.string(),
  targetId: z.string().optional(),
  meta: z.record(z.any()).optional()
});
export type ActivityDto = z.infer<typeof ActivityDto>;
