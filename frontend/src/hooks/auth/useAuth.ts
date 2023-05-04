
import axios from "axios";
import { IncomingMessage } from "http";

export const useAuth = async (
  req: IncomingMessage & {
    cookies: Partial<{
      [key: string]: string;
    }>;
  }
) => {
  const data = await axios
    .get("http://localhost:8000/api/v1/merchants", {
      headers: { cookie: req.headers.cookie },
      withCredentials: true,
    })
    .then((res) => res.data)
    .catch((error) => console.log("error"));

  return {
    isAuthenticated: !!data,
  };
};
