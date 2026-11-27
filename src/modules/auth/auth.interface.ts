export type TUserRole = "attendee" | "organizer";

export interface ICreateUserPayload {
  name: string;
  email: string;
  password: string;
  role?: TUserRole;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: TUserRole;
  created_at: Date;
  updated_at: Date;
}