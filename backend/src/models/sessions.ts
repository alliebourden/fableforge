import Joi from "joi";

export interface Sessions {
  id?: number
  userId: number
  header: string
  date: string
  body: string
  tags?: string[]
}

const SessionSchema = Joi.object<Sessions>({
  id: Joi.number().optional(),
  userId: Joi.number().optional(),
  header: Joi.string().required(),
  date: Joi.string().required(),
  body: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).optional(),
});

export const validateSession = (session: any): Sessions | null => {
  const { error, value } = SessionSchema.validate(session);
  if (error !== undefined) {
    return null
  }
  return value
};
