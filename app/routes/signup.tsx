import { type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Sign up | Yoga Poses" },
    { name: "description", content: "Create a new account" },
  ];
};

export default function Index() {
  // useState for email
  // useState for password
  // useState for form errors

  // handleEmailField

  // handlePasswordField

  // handleFormSubmit

  return (
    <form action="">
      <div>
        <label>
          E-mail address
          <input type="text" name="email" id="email" />
        </label>
        {/* TODO: display validation errors */}
      </div>

      <div>
        <label>
          Password
          <input type="text" name="password" id="password" />
        </label>
        {/* TODO: display validation errors */}
      </div>

      {/* TODO: display Supabase errors */}

      <button type="submit">Sign up</button>
    </form>
  );
}
