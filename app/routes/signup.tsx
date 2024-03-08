import { type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Sign up | Yoga Poses" },
    { name: "description", content: "Create a new account" },
  ];
};

export default function Index() {
  return (
    <form action="">
      <label>
        E-mail address
        <input type="text" name="email" id="email" />
      </label>

      <label>
        Password
        <input type="text" name="password" id="password" />
      </label>
      <button type="submit">Sign up</button>
    </form>
  );
}
