import { UserRoleEnum } from '@prisma/client';

export interface IBaseAuthHeader {
  userId: string;
  role: UserRoleEnum;
}

export interface IBaseServiceReply {
  message: string;
  status: number;
}

export interface IBaseReplyData {
  [key: string]: {
    status: number;
    message: string;
  }
}

export const ErrorReplyData: IBaseReplyData = {
  NOT_AUTH: {
    status: 400,
    message: 'You are not authenticated'
  },
  ACCESS_DENIED: {
    status: 400,
    message: 'You do not have access for this operation'
  },
  AUTHENTICATION_ERROR: {
    status: 400,
    message: 'Something is wrong, authentication is not complete'
  },
  EXIST_EMAIL_ERROR: {
    status: 400,
    message: 'Email does not exist'
  },
  EXIST_USER_ERROR: {
    status: 400,
    message: 'The user already exists'
  },
  NON_EXIST_USER_ERROR: {
    status: 400,
    message: 'User is not found'
  },
  NON_EXIST_DATA_ERROR: {
    status: 400,
    message: 'Data is not found'
  },
  PASSWORD_MATCH_ERROR: {
    status: 400,
    message: 'Incorrect password'
  },
  TOKEN_EXPIRED: {
    status: 401,
    message: 'Token expired'
  },
  TOKEN_VALID_ERROR: {
    status: 400,
    message: 'Token is invalid'
  },
  VALIDATION_ERROR: {
    status: 400,
    message: 'Data validation error'
  },
  CREATE_ERROR: {
    status: 400,
    message: 'Something is wrong, data is not created'
  },
  SEND_ERROR: {
    status: 400,
    message: 'Something is wrong, data is not sended'
  },
  UPDATE_ERROR: {
    status: 400,
    message: 'Something is wrong, data is not updated'
  },
  DELETE_ERROR: {
    status: 400,
    message: 'Something is wrong, data is not deleted'
  }
};

export const SuccessReplyData: IBaseReplyData = {
  AUTHENTICATION_SUCCESS: {
    status: 200,
    message: 'The entrance is made'
  },
  CREATE_SUCCESS: {
    status: 201,
    message: 'Data saved'
  },
  SEND_SUCCESS: {
    status: 200,
    message: 'Data sended'
  },
  UPDATE_SUCCESS: {
    status: 204,
    message: 'Data updated'
  },
  DELETE_SUCCESS: {
    status: 204,
    message: 'Data deleted'
  }
};

export enum CategoryTypeEnum {
  income = 'income',
  expense = 'expense'
}
