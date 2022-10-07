import { verify } from "jsonwebtoken";
let authManager = async (token: string) => {
  try {
    return verify(
      token,
      process.env.API_SECRET as string,
      async (err: any, decoded: any) => {
        if (decoded.username === "manager" && decoded.password === "manager")
          return true;
        else return false;
      }
    );
  } catch (e) {
    return false;
  }
};

export default authManager;
