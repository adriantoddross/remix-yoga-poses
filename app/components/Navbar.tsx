import { Link, useNavigate } from "@remix-run/react";
import { SupabaseClient } from "@supabase/supabase-js";

type NavbarProps = {
  supabase: SupabaseClient;
  userIsLoggedIn: boolean;
};

export default function Navbar({ supabase, userIsLoggedIn }: NavbarProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth
      .signOut()
      .then(() => navigate("/"))
      .catch((error) => {
        throw new Error(error?.message);
      });
  };

  return (
    <header>
      <h1>Yoga Poses</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          {userIsLoggedIn ? (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Log out</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signup">Sign up</Link>
              </li>
              <li>
                <Link to="/login">Log in</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
