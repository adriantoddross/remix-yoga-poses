import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Yoga Poses" },
    { name: "description", content: "View favorite Yoga poses" },
  ];
};

export default function Index() {
  return (
    <body>
      <h2>Profile page</h2>
      <div>
        <h3>Favorite Poses</h3>
      </div>
    </body>
  );
}
