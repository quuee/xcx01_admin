import axiosInstance from "@/utils/axiosInstance";

interface ApiResult {
    code: number,
    msg: string,
    token: string
}

export async function login(data: any): Promise<ApiResult> {
    const response = await axiosInstance.post<ApiResult>("/admin/login", data);
    return response.data;
}