export interface IUser {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
}

export interface IUserFormValues {
  name: string;
  email: string;
  city: string;
}
