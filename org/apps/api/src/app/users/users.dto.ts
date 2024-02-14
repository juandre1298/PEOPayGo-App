// user.dto.ts

// Interface for creating a user
export interface CreateUserDto {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  type: 'admin' | 'customer';
}
// Interface for updating a user
export interface UpdateUserDto {
  email?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  type?: 'admin' | 'customer';
}
