import { API } from "@/src/libs/base-axios";


export const signup = async (body:ISignupPayload): Promise<void> => {
     await API.post(`/auth/merchants/signup`, body).then(
        (response) => response.data
    );
};
export const signout = async (): Promise<void> => {
     await API.post(`/auth/merchants/signout`).then(
        (response) => response.data
    );
};
export const signin = async (body: ISigninPayload): Promise<ISigninResponse> => {
    const result = await API.post(`/auth/merchants/signin`, body).then(
        (response) => response.data
    );
    return result;
};
