import { type MetaFunction } from "@remix-run/node";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Sign up | Yoga Poses" },
    { name: "description", content: "Create a new account" },
  ];
};

export default function Index() {
  const [formValues, setFormValues] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  // TODO: useState for form errors

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;

    setFormValues({ ...formValues, [name]: value });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO: handle validation errors
    console.log("Submitting...", formValues);
  };

  return (
    <form action="">
      <div>
        <label>
          E-mail address
          <input
            type="text"
            name="email"
            id="email"
            onChange={handleInputChange}
          />
        </label>
        {/* TODO: display validation errors */}
      </div>

      <div>
        <label>
          Password
          <input
            type="text"
            name="password"
            id="password"
            onChange={handleInputChange}
          />
        </label>
        {/* TODO: display validation errors */}
      </div>

      {/* TODO: display Supabase errors */}

      <button type="submit" onClick={handleFormSubmit}>
        Sign up
      </button>
    </form>
  );
}
