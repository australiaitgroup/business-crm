import { Schema, model, models, InferSchemaType } from 'mongoose';
import { z } from 'zod';

const MeetingMinuteSchema = new Schema({
  meetingId: { type: Schema.Types.ObjectId, ref: 'Meeting', required: true },
  content: { type: String, required: true },
  version: { type: Number, default: 1 },
  deletedAt: { type: Date, default: null }
}, { timestamps: true });

MeetingMinuteSchema.pre('save', async function(next) {
  if (this.isNew) {
    const model = this.model('MeetingMinute');
    const last = await model.findOne({ meetingId: this.meetingId }).sort({ version: -1 });
    this.version = last ? last.version + 1 : 1;
  }
  next();
});

export type MeetingMinute = InferSchemaType<typeof MeetingMinuteSchema>;

export const MeetingMinuteModel = models.MeetingMinute || model<MeetingMinute>('MeetingMinute', MeetingMinuteSchema);

export const MeetingMinuteDto = z.object({
  meetingId: z.string(),
  content: z.string()
});
export type MeetingMinuteDto = z.infer<typeof MeetingMinuteDto>;
