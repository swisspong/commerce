import { API } from "@/src/libs/base-axios";

export const GetMerchantInfo = async (): Promise<IMerchantInfoResponse> => {
    const res = await API.get(`/merchants`);
    return res.data;
}
