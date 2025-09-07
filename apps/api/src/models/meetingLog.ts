import { Schema, model, models, InferSchemaType } from 'mongoose';
import { z } from 'zod';

const MeetingLogSchema = new Schema({
  meetingId: { type: Schema.Types.ObjectId, ref: 'Meeting', required: true },
  message: { type: String, required: true },
  deletedAt: { type: Date, default: null }
}, { timestamps: true });

MeetingLogSchema.index({ meetingId: 1, createdAt: -1 });

export type MeetingLog = InferSchemaType<typeof MeetingLogSchema>;

export const MeetingLogModel = models.MeetingLog || model<MeetingLog>('MeetingLog', MeetingLogSchema);

export const MeetingLogDto = z.object({
  meetingId: z.string(),
  message: z.string()
});
export type MeetingLogDto = z.infer<typeof MeetingLogDto>;
