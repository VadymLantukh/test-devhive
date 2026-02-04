import { IUser } from '@/types/types';
import { API_URL } from '@/lib/constants';

export const queryUsers = async (): Promise<IUser[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Network response was not ok');

  return res.json();
};

export const queryUpdateUser = async (userData: IUser): Promise<IUser> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return userData;
};
