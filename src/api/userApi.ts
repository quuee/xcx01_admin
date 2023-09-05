import { get, post, put, del } from "@/utils/request";

export const useGetUserInfoApi = () => {
	return get('/user/info')
}

export const useAddOrUpdateApi = (user:any) => {
	return post('/user/saveOrUpdate',user)
}