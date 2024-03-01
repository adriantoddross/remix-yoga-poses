import {
  redirect,
  json,
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const userAccount = {
    username: body.get("username"),
    password: body.get("password"),
  };

  return json({ userAccount });
}

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   const response = new Response();
//   const url = new URL(request.url);
//   const code = url.searchParams.get("code");

//   return;
// };

export default function Signup() {
  const data = useActionData<typeof action>();

  return (
    <>
      <div>{data ? <p>{data.userAccount.username}</p> : "Waiting..."}</div>

      <Form method="post">
        <label>
          Username
          <input name="username" type="text" />
        </label>
        <label>
          Password
          <input name="password" type="text" />
        </label>

        <button type="submit">Submit</button>
      </Form>
    </>
  );
}
