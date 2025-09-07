import { Schema, model, models, InferSchemaType } from 'mongoose';
import { z } from 'zod';

export const COMMISSION_STATUS = ['pending', 'paid'] as const;

const CommissionSchema = new Schema({
  opportunityId: { type: Schema.Types.ObjectId, ref: 'Opportunity', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: COMMISSION_STATUS, default: 'pending' },
  deletedAt: { type: Date, default: null }
}, { timestamps: true });

CommissionSchema.index({ opportunityId: 1, status: 1 });

export type Commission = InferSchemaType<typeof CommissionSchema>;

export const CommissionModel = models.Commission || model<Commission>('Commission', CommissionSchema);

export const CommissionDto = z.object({
  opportunityId: z.string(),
  userId: z.string(),
  amount: z.number(),
  status: z.enum(COMMISSION_STATUS).optional()
});
export type CommissionDto = z.infer<typeof CommissionDto>;
