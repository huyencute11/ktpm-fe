import axiosInstance from '../../../services/axios'

export async function apiGetClassInSubject<T>() {
    return axiosInstance.get<T>(`credit-class`)
}

export async function apiGetSubjec<T>() {
    return axiosInstance.get<T>(`credit-class`)
}
