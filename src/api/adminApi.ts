import { get, post, put, del } from "@/utils/request";

export const useGetAdminInfoApi = () => {
	return get('/admin/info')
}

export const useAddOrUpdateApi = (user:any) => {
	return post('/admin/saveOrUpdate',user)
}

export const useUpdatePasswordApi = (user:any) => {
	return put('/admin/updatePassword',user)
}

export const useChangeAvatarApi = (image:any) => {
	return put('/admin/changeAvatar',image)
}

export const useAdminUserListApi = (query:any) => {
	return get('/admin/pageList',query)
}

export const useGetAdminInfoByIdApi = (query:any) => {
	return get('/admin/info',query)
}