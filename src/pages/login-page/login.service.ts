import { MessageResponse } from "../../models";
import { http } from "../../tools/axios.interceptor";

export const loginUser = (login: string): Promise<MessageResponse> => {
  return http.post('/auth/login', { login })
}