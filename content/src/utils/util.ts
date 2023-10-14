import { USER_SERVICE_URL } from '@/config';
import { HttpException } from '@/exceptions/HttpException';
import axios from 'axios';
import { NextFunction } from 'express';

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

/**
 * @method checkUserExists
 * @param {String} userId
 * @returns {Boolean} true & false
 * @description Check if user exists
 */
export const checkUserExists = async (userId: string, next: NextFunction) => {
  const response = await axios.get(`${USER_SERVICE_URL}/${userId}`);

  if (response.status !== 200) {
    next(new HttpException(404, "User doesn't exist"));
  }

  return response.data.data ? true : false;
};
