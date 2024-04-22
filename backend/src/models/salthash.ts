import Joi from 'joi'

export interface SaltHash {
  password: string,
  password_hash: string
  salt: string
}

const SaltHashSchema = Joi.object<SaltHash>({
  password: Joi.string().required(),
  password_hash: Joi.string().required(),
  salt: Joi.string().required(),
})
