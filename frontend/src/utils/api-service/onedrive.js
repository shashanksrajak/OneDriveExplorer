import axiosInstance from "./axios"


export const listFiles = async () => {
    const response = await axiosInstance.get("/api/v1/onedrive/files")
    return response.data
}

export const listPermissions = async (itemId) => {
    const response = await axiosInstance.get(`/api/v1/onedrive/files/users?itemId=${itemId}`)
    console.log(response.data)
    return response.data
}

