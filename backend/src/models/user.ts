import Joi from 'joi'

type email = string

export interface User {
  id?: number
  name: string
  email: email
  username: string
  password: string,
  password_hash: string
  salt: string
}

const UserSchema = Joi.object<User>({
  id: Joi.number().optional(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  password_hash: Joi.string().optional(),
  salt: Joi.string().optional(),
})

export const validateUser = (user: any): User | null => {
  const { error, value } = UserSchema.validate(user)
  if (error !== undefined) {
    return null
  }
  return value
}
