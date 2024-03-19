import {
  redirect,
  type MetaFunction,
  json,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { Link, useLoaderData, useOutletContext } from "@remix-run/react";
import {
  SupabaseClient,
  createServerClient,
} from "@supabase/auth-helpers-remix";
import { useState } from "react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const response = new Response();

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      request,
      response,
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return json({
    session,
  });
};

export const meta: MetaFunction = () => {
  return [
    { title: "Log in | Yoga Poses" },
    { name: "description", content: "Log in to your account" },
  ];
};

// Sign up button to sign in with Google
// Signup form to login with email and password

export default function Login() {
  const { session } = useLoaderData<typeof loader>();
  const { supabase } = useOutletContext<{
    supabase: SupabaseClient;
  }>();

  const userIsLoggedIn = session;

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

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setFormErrors([error.message]);
    }

    if (data.user || data.session) {
      redirect("http://localhost:3000/profile");
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
        <h2>Log in</h2>
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
        {userIsLoggedIn ? <p>You are already logged in. </p> : null}
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
