import axiosInstance from "../../../services/axios";

interface LoginRequest {
    studentId: number;
    password: string;
    
}
type DataLoginRespone ={
    token: string;
    studentId: number;
    message: string;
    status: number;
  }
  

export async function apiLogin<T>(data: LoginRequest) {
    return axiosInstance.post<T>(`students/login`, data);
}