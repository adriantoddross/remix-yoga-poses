import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import Poses from "~/components/Poses";
import { globalContext } from "~/context/globalContext";
import { getPoses, PoseRecord } from "~/data";

export const meta: MetaFunction = () => {
  return [
    { title: "Yoga Poses" },
    { name: "description", content: "View favorite Yoga poses" },
  ];
};

export const loader = async () => {
  const posesData = await getPoses();
  return json({ posesData });
};

export default function Index() {
  const { posesData } = useLoaderData<typeof loader>();
  const { favoritePoses } = useContext(globalContext);
  const filteredPoses = posesData.filter(({ id }: { id: PoseRecord["id"] }) =>
    favoritePoses.includes(id)
  );

  return (
    <body>
      <h2>Profile page</h2>
      <div>
        <h3>Favorite Poses</h3>
        {filteredPoses.length ? <Poses poses={filteredPoses} /> : null}
      </div>
    </body>
  );
}
