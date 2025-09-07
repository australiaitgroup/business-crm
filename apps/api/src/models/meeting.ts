import { Schema, model, models, InferSchemaType } from 'mongoose';
import { z } from 'zod';

const MeetingSchema = new Schema({
  opportunityId: { type: Schema.Types.ObjectId, ref: 'Opportunity', required: true },
  scheduledAt: { type: Date, required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  deletedAt: { type: Date, default: null }
}, { timestamps: true });

export type Meeting = InferSchemaType<typeof MeetingSchema>;

export const MeetingModel = models.Meeting || model<Meeting>('Meeting', MeetingSchema);

export const MeetingDto = z.object({
  opportunityId: z.string(),
  scheduledAt: z.coerce.date(),
  participants: z.array(z.string()).optional()
});
export type MeetingDto = z.infer<typeof MeetingDto>;
