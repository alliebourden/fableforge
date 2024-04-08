import Joi from 'joi'

type email = string

export interface User {
  id?: number
  name: string
  email: email
}

const UserSchema = Joi.object<User>({
  id: Joi.number().optional(),
  name: Joi.string().required(),
  email: Joi.string().email().required()
})

export const validateUser = (user: any): User | null => {
  const { error, value } = UserSchema.validate(user)
  if (error !== undefined) {
    return null
  }
  return value
}
