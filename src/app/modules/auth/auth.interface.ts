export type TUser = {
  name: string;
  email: string;
  phone?: string;
  password: string;
  profilePicture?: string;
  status: 'active' | 'blocked';
  role: 'user' | 'admin' | 'super-admin';
};
