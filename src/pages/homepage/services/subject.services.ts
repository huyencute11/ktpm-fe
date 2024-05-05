import axiosInstance from '../../../services/axios'

export async function apiGetSubject<T>() {
    return axiosInstance.get<T>(`credit-class`)
}


