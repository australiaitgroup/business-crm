import { Schema, model, models, InferSchemaType } from 'mongoose';
import { z } from 'zod';

export const OPPORTUNITY_STAGES = ['lead', 'qualify', 'proposal', 'negotiation', 'won', 'lost'] as const;

const OpportunitySchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  stage: { type: String, enum: OPPORTUNITY_STAGES, required: true, default: 'lead' },
  amountExpected: { type: Number },
  amountSigned: { type: Number },
  contributors: [{ userId: { type: Schema.Types.ObjectId, ref: 'User' }, share: Number }],
  deletedAt: { type: Date, default: null }
}, { timestamps: true });

OpportunitySchema.index({ stage: 1, ownerId: 1 });

export type Opportunity = InferSchemaType<typeof OpportunitySchema>;

export const OpportunityModel = models.Opportunity || model<Opportunity>('Opportunity', OpportunitySchema);

export const OpportunityDto = z.object({
  customerId: z.string(),
  ownerId: z.string(),
  stage: z.enum(OPPORTUNITY_STAGES).optional(),
  amountExpected: z.number().optional(),
  amountSigned: z.number().optional(),
  contributors: z.array(z.object({ userId: z.string(), share: z.number() })).optional()
});
export type OpportunityDto = z.infer<typeof OpportunityDto>;
