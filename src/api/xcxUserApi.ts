import { get, post, put, del } from "@/utils/request";

export const useXcxUserListApi = (query:any) => {
	return get('/xcxUser/pageList',query)
}