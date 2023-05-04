import Image from "next/image";
import { Inter } from "next/font/google";
import { useMerchantSignup } from "@/src/hooks/auth/mutations";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { useAuth } from "@/src/hooks/auth/useAuth";

const inter = Inter({ subsets: ["latin"] });

export default function Signup() {
  const router = useRouter();
  const [signupPayload, setSignpuPayload] = useState<ISignupPayload>({
    email: "",
    password: "",
    username: "",
  });

  const { mutate: signup, isSuccess } = useMerchantSignup();
  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess) {
      router.push("/merchants");
    }
  }, [isSuccess]);
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignpuPayload((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(signupPayload);
  };

  return (
    <>
      <h1 className="text-blue-400 text-lg">Merchant Signup Page</h1>
      <form onSubmit={onSubmitHandler}>
        <label className="block text-blue-300 font-bold " htmlFor="email">
          Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          onChange={inputChangeHandler}
          value={signupPayload.email}
          className="bg-transparent border border-cyan-400 focus:outline-0 text-blue-400"
        />
        <label className="block text-blue-300 font-bold " htmlFor="username">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={inputChangeHandler}
          value={signupPayload.username}
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
          value={signupPayload.password}
          className="bg-transparent border border-cyan-400 focus:outline-0 text-blue-400"
        />
        <br />
        <br />
        <button
          type="submit"
          className="block text-white bg-blue-400 px-2 py-1"
        >
          Signup
        </button>
        <Link href="/merchants">
          <button className="block text-white bg-blue-400 px-2 py-1">
            Go to My Page
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
