import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
  useOutletContext,
  useRevalidator,
  useRouteError,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import {
  Session,
  SupabaseClient,
  createBrowserClient,
} from "@supabase/auth-helpers-remix";
import { createSupabaseServerClient } from "./supabase/serverClient";
import Navbar from "./components/Navbar";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const response = new Response();

  const { supabase } = createSupabaseServerClient(request);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  };

  return json(
    {
      env,
      session,
      userIsLoggedIn: Boolean(session?.user),
    },
    {
      headers: response.headers,
    }
  );
};

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  return (
    <html lang="en">
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div>
          <h1>Something went wrong!</h1>
          <p>Sorry about that.</p>
        </div>

        <div>
          <p>Error: {error?.data}</p>
          <p>Status code: {error?.status}</p>
        </div>
        <Scripts />
      </body>
    </html>
  );
}

type RootContextType = {
  supabase: SupabaseClient;
  user?: Session["user"];
  userIsLoggedIn: boolean;
};

export function useUser() {
  return useOutletContext<RootContextType>();
}

export default function App() {
  const { revalidate } = useRevalidator();

  const { env, session, userIsLoggedIn } = useLoaderData<typeof loader>();

  const [supabase] = useState(() =>
    createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  );

  const serverAccessToken = session?.access_token;

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (
        event !== "INITIAL_SESSION" &&
        session?.access_token !== serverAccessToken
      ) {
        // server and client are out of sync.
        revalidate();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [serverAccessToken, supabase, revalidate]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body>
        <Navbar supabase={supabase} userIsLoggedIn={userIsLoggedIn} />
        <footer>
          <p>Created by Adrian Ross</p>
        </footer>
        <Outlet
          context={
            {
              supabase,
              user: session?.user,
              userIsLoggedIn: Boolean(session?.user),
            } satisfies RootContextType
          }
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
