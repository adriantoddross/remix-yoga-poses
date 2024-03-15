import { redirect, type MetaFunction } from "@remix-run/node";
import { useOutletContext } from "@remix-run/react";
import { SupabaseClient } from "@supabase/supabase-js";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Sign up | Yoga Poses" },
    { name: "description", content: "Create a new account" },
  ];
};

export default function Index() {
  const { supabase } = useOutletContext<{
    supabase: SupabaseClient;
  }>();

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
    const { email, password } = formValues;
    console.log("Submitting...", formValues);

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setFormErrors([error.message]);
    }

    if (data.user) {
      resetFormValues();
      redirect("http://localhost:3000/profile");
    }
  };

  const isFormError = formErrors.length;
  const emptyFormFields = !formValues.email || !formValues.password;

  return (
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
          />
        </label>
        {/* TODO: display validation errors */}
      </div>

      <div>
        {isFormError
          ? formErrors.map((error) => <p key={error}>{error}</p>)
          : null}
      </div>

      <button
        type="submit"
        onClick={handleFormSubmit}
        disabled={emptyFormFields}
      >
        Sign up
      </button>
    </form>
  );
}
