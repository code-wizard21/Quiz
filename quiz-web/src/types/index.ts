export type IBase = {
  id: string;
  created_at: string;
  updated_at: string;
};

export interface IBaseUser extends IBase {
  name: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
}

export interface IMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string | null;
  per_page: number;
  to: number;
  total: number;
}