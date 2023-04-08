import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type YupType = typeof yup;

export const createYupResolver = (
  cb: (yupInstance: YupType) => yup.ObjectSchema<any, yup.AnyObject, any, ''>,
) => {
  const schema = cb(yup);
  return yupResolver(schema);
};
