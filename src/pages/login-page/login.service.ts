import { SuccessResponse } from "../../models";
import { http } from "../../tools/axios.interceptor";

export const loginUser = (login: string): Promise<SuccessResponse> => {
  return http.post('/users/login', { login })
}