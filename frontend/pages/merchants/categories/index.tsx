

import Image from "next/image";
import axios from "axios";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { GetMerchantInfo } from "@/src/services/merchant/merchant.service";
import { useGetMerchantInfo } from "@/src/hooks/merchant/queries";
import { useAuth } from "@/src/hooks/auth/useAuth";
import { error } from "console";
import { useMerchantSignout } from "@/src/hooks/auth/mutations";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function CategoryAdd() {
  const router = useRouter();
  const { data, refetch, error, isError } = useGetMerchantInfo();
  const { mutate: signout, isSuccess } = useMerchantSignout();
  useEffect(() => {
    if (isSuccess) router.push("/auth/signin");
  }, [isSuccess]);

  return (
    <>
      <h1 className="text-blue-400 text-lg">Category List Page</h1>
      <br />
      <p className="text-blue-200">{JSON.stringify(data, null)}</p>
      
      <button
        type="button"
        className=" text-white bg-blue-400 px-2 py-1"
        onClick={() => signout()}
      >
        Signout
      </button>
      <br></br>
      <Link href="/auth/signin">
        <button className="block text-white bg-blue-400 px-2 py-1">
          Back to signin
        </button>
      </Link>
      <br />
      <button
        type="button"
        className="block text-white bg-blue-400 px-2 py-1"
        onClick={() => refetch()}
      >
        Refetch
      </button>
      <Link href="/merchants/products/add">
        <button className="block text-white bg-blue-400 px-2 py-1">
          Add Product
        </button>
      </Link>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  const { isAuthenticated } = await useAuth(context.req);
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  await queryClient.prefetchQuery(["merchant"], () =>
    axios
      .get("http://localhost:8000/api/v1/merchants", {
        headers: { cookie: context.req.headers.cookie },
        withCredentials: true,
      })
      .then((res) => res.data)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
