import { type MetaFunction } from "@remix-run/node";
import { Link, useNavigate } from "@remix-run/react";

import { useState } from "react";
import { useUser } from "~/root";

export const meta: MetaFunction = () => {
  return [
    { title: "Sign up | Yoga Poses" },
    { name: "description", content: "Create a new account" },
  ];
};

export default function SignUp() {
  const { supabase, userIsLoggedIn } = useUser();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const resetFormValues = () => setFormValues({ email: "", password: "" });

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;

    setFormValues({ ...formValues, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    // TODO: handle validation errors
    e.preventDefault();
    resetFormValues();

    const { email, password } = formValues;

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setFormErrors([error.message]);
    }

    if (data.user || data.session) {
      navigate("/");
    }
  };

  const isFormError = formErrors.length;
  const emptyFormFields = !formValues.email || !formValues.password;

  return userIsLoggedIn ? (
    <div>
      <h2>You&apos;re already logged in.</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Go home</Link>
          </li>
          <li>
            <Link to="/profile">View your profile</Link>
          </li>
        </ul>
      </nav>
    </div>
  ) : (
    <form>
      {/* TODO: Replace with React Final Form */}
      <div>
        <label>
          E-mail address
          <input
            id="email"
            minLength={3}
            name="email"
            onChange={handleInputChange}
            required
            type="text"
            autoComplete="email"
          />
        </label>
        {/* TODO: display validation errors */}
      </div>

      <div>
        <label>
          Password
          <input
            id="password"
            minLength={8}
            name="password"
            onChange={handleInputChange}
            required
            type="text"
            autoComplete="new-password"
          />
        </label>
        {/* TODO: display validation errors */}
      </div>

      <div>
        {isFormError
          ? formErrors.map((error) => <p key={error}>{error}</p>)
          : null}
        {userIsLoggedIn ? <p>You are already logged in. </p> : null}
      </div>

      <button
        type="submit"
        onClick={handleFormSubmit}
        disabled={emptyFormFields || userIsLoggedIn}
      >
        Sign up
      </button>
    </form>
  );
}
