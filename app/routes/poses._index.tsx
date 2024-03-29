import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Pose from "~/components/Pose";
import { PoseRecord } from "~/types";

export async function loader() {
  const poses = await fetch(
    `${process.env.YOGA_API_BASE_URL}${process.env.YOGA_API_POSES}`
  ).then((data) => data);

  if (!poses) {
    throw new Response("Poses not found", { status: 404 });
  }

  const posesData: PoseRecord[] = await poses.json();

  return json({ posesData });
}

export default function Category() {
  const { posesData } = useLoaderData<typeof loader>();

  return (
    <section>
      <h2>Poses</h2>
      <ul>
        {posesData.map((pose) => {
          const { id } = pose;
          return <Pose key={id} {...pose} />;
        })}
      </ul>
    </section>
  );
}
