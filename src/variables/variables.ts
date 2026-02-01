export const URL = "https://codelang.vercel.app";

export const getApiBase = () => (typeof window === "undefined" ? URL : "");

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;
