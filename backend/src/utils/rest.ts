export interface RESTObject {
  status: string
  message?: string
  data?: any
}

export const error = (message: string): RESTObject => {
  return {
    status: 'error',
    message
  }
}

export const success = (data: any, message?: string): RESTObject => {
  if (message !== undefined) {
    return {
      status: 'success',
      message,
      data
    }
  } else {
    return {
      status: 'success',
      data
    }
  }
}
