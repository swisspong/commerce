
import { signin, signout, signup } from "@/src/services/auth/merchant.auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMerchantSignup = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (body:ISignupPayload) => signup(body),
        {
            // When mutate is called:
            onMutate: async (info) => {
                // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
                await queryClient.cancelQueries(["auth"]);

                // Snapshot the previous value
                const previousInfos = queryClient.getQueryData(["auth"]);

                return { previousInfos };
            },
            // If the mutation fails, use the context returned from onMutate to roll back
            onError: (err: any, variables, context) => {
                // displayError(err.response?.data?.message)
                if (context?.previousInfos) {
                    queryClient.setQueryData(["auth"], context.previousInfos);
                }
            },
            // Always refetch after error or success:
            onSettled: () => {
                queryClient.invalidateQueries(["auth"]);
            },
        }
    );
};
export const useMerchantSignin = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (body:ISigninPayload) => signin(body),
        {
            // When mutate is called:
            onMutate: async (info) => {
                // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
                await queryClient.cancelQueries(["auth"]);

                // Snapshot the previous value
                const previousInfos = queryClient.getQueryData(["auth"]);

                return { previousInfos };
            },
            // If the mutation fails, use the context returned from onMutate to roll back
            onError: (err: any, variables, context) => {
                // displayError(err.response?.data?.message)
                if (context?.previousInfos) {
                    queryClient.setQueryData(["auth"], context.previousInfos);
                }
            },
            // Always refetch after error or success:
            onSettled: () => {
                queryClient.invalidateQueries(["auth"]);
            },
        }
    );
};
export const useMerchantSignout = () => {
    const queryClient = useQueryClient();
    return useMutation(
        () => signout(),
        {
            // When mutate is called:
            onMutate: async (info) => {
                // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
                await queryClient.cancelQueries(["auth"]);

                // Snapshot the previous value
                const previousInfos = queryClient.getQueryData(["auth"]);

                return { previousInfos };
            },
            // If the mutation fails, use the context returned from onMutate to roll back
            onError: (err: any, variables, context) => {
                // displayError(err.response?.data?.message)
                if (context?.previousInfos) {
                    queryClient.setQueryData(["auth"], context.previousInfos);
                }
            },
            // Always refetch after error or success:
            onSettled: () => {
                queryClient.invalidateQueries(["auth"]);
            },
        }
    );
};