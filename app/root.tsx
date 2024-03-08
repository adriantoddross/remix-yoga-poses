import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";
import { useState } from "react";
import { PoseRecord } from "./data";
import { globalContext } from "./context/globalContext";
import { createBrowserClient } from "@supabase/auth-helpers-remix";
import type { Database } from "db_types";

export const loader = ({}: LoaderFunctionArgs) => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  };

  return json({ env });
};

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  const { env } = useLoaderData<typeof loader>();
  const [supabase] = useState(() =>
    createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  );
  const [favoritePoses, setFavoritePoses] = useState<PoseRecord["id"][]>([]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body>
        <header>
          <h1>Yoga Poses</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/profile">Login</Link>
              </li>
            </ul>
          </nav>
        </header>
        <footer>
          <p>Created by Adrian Ross</p>
        </footer>
        {/* Usecontext open */}
        <globalContext.Provider value={{ favoritePoses, setFavoritePoses }}>
          <Outlet context={{ supabase }} />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </globalContext.Provider>
        {/* UseContext close */}
      </body>
    </html>
  );
}
