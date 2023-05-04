import { GetMerchantInfo } from "@/src/services/merchant/merchant.service";
import { useQuery } from "@tanstack/react-query";
//import { useRouter } from "next/router";

export const useGetMerchantInfo = () => {

    return useQuery(["merchant"], () => GetMerchantInfo());

};