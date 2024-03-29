import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { PoseRecord } from "~/types";

export async function loader({ params }: LoaderFunctionArgs) {
  invariant(params.name, "Missing pose name param");

  const pose = await fetch(
    `${process.env.YOGA_API_BASE_URL}${process.env.YOGA_API_POSES}?name=${params.name}`
  ).then((data) => data);

  if (!pose) {
    throw new Response("Pose not found", { status: 404 });
  }

  const poseData: PoseRecord = await pose.json();

  return json({ poseData });
}

export default function Category() {
  const { poseData } = useLoaderData<typeof loader>();

  const {
    english_name,
    pose_description,
    pose_benefits,
    sanskrit_name,
    url_svg,
  } = poseData;

  return (
    <section>
      <div>
        <h2>{english_name}</h2>
        <h3>{sanskrit_name}</h3>
        <img
          src={url_svg}
          alt={`Graphic of person doing ${english_name} pose`}
        />
      </div>

      <section>
        <h3>Description</h3>
        <p>{pose_description}</p>
      </section>

      <section>
        <h3>Benefits</h3>
        <p>{pose_benefits}</p>
      </section>
    </section>
  );
}
