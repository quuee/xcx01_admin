import { get, post, put, del } from "@/utils/request";

export const useMenuTreeApi = (adminId: Number) => {
	return get('/menu/tree',{adminId})
}