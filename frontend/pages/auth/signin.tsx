import Image from "next/image";
import { Inter } from "next/font/google";
import {
  useMerchantSignin,
  useMerchantSignup,
} from "@/src/hooks/auth/mutations";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { useAuth } from "@/src/hooks/auth/useAuth";

const inter = Inter({ subsets: ["latin"] });

export default function Signup() {
  const router = useRouter();
  const [signinPayload, setSigninPayload] = useState<ISigninPayload>({
    email: "",
    password: "",
  });

  const { mutate: signin, isSuccess } = useMerchantSignin();
  useEffect(() => {
    if (isSuccess) router.push("/merchants");
  }, [isSuccess]);
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSigninPayload((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signin(signinPayload);
  };

  return (
    <>
      <h1 className="text-blue-400 text-lg">Merchant Signin Page</h1>
      <form onSubmit={onSubmitHandler}>
        <label className="block text-blue-300 font-bold " htmlFor="email">
          Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          onChange={inputChangeHandler}
          value={signinPayload.email}
          className="bg-transparent border border-cyan-400 focus:outline-0 text-blue-400"
        />

        <label className="block text-blue-300 font-bold " htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={inputChangeHandler}
          value={signinPayload.password}
          className="bg-transparent border border-cyan-400 focus:outline-0 text-blue-400"
        />
        <br />
        <br />
        <button
          type="submit"
          className="block text-white bg-blue-400 px-2 py-1"
        >
          Signin
        </button>
        <Link href="/merchants">
          <button className="block text-white bg-blue-400 px-2 py-1">
            Go to Dashboard
          </button>
        </Link>
      </form>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { isAuthenticated } = await useAuth(context.req);
  if (isAuthenticated) {
    return {
      redirect: {
        destination: "/merchants",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
