import { get, post, put, del } from "@/utils/request";

export const useMenuTreeApi = (userId: Number) => {
	return get('/menu/tree',{userId})
}