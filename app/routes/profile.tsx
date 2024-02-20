import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import Pose from "~/components/Pose";
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

  console.log(favoritePoses);
  console.log(filteredPoses);

  return (
    <body>
      <h2>Profile page</h2>
      <div>
        <h3>Favorite Poses</h3>
        {filteredPoses.map((pose) => (
          <Pose
            key={pose.id}
            {...pose}
            favorite={favoritePoses.includes(pose.id)}
          />
        ))}
      </div>
    </body>
  );
}
