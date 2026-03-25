export interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  department: string;
  createdAt: string;
}

export interface UserListResponse {
  data: User[];
  total: number;
  page: number;
  pageSize: number;
}