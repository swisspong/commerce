import "@/styles/globals.css";
import {
  Query,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosError } from "axios";
import type { AppProps } from "next/app";
import React from "react";
import { useRouter } from "next/router";
interface QueryCacheError extends AxiosError {
  // Define any additional properties you want to include in the error
  customProperty: string;
}
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (
            error: unknown,
            query: Query<unknown, unknown, unknown>
          ) => {
            if (error instanceof Error) {
              const axiosError = error as AxiosError;
              const customError: QueryCacheError = {
                ...axiosError,
                customProperty: "custom value",
              };
              console.log(`Something went wrong: ${customError.message}`);
              console.log(`Status code: ${customError.response?.status}`);
              if (customError.response?.status === 401) {
                router.push("/auth/signin");
              }
              console.log(`Custom property: ${customError.customProperty}`);
            } else {
              console.log(`Something went wrong: ${error}`);
            }
          },
        }),
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
