import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Yoga Poses" },
    { name: "description", content: "View your favorite Yoga poses" },
  ];
};

export default function Index() {
  return (
    <>
      <h2>Profile page</h2>
      <div>
        <h3>Favorite Poses</h3>
        <p>Coming soon...</p>
      </div>
    </>
  );
}
