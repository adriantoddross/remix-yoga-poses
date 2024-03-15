import { type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Log in | Yoga Poses" },
    { name: "description", content: "Log in to your account" },
  ];
};

export default function Login() {
  return <h1>Login page</h1>;
}
