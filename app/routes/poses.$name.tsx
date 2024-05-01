import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import PoseDetails from "~/components/PoseDetails";
import { PoseRecord } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: "Yoga Poses" },
    { name: "description", content: "View pose info" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  invariant(params.name, "Missing pose name param");

  const pose = await fetch(
    `${process.env.YOGA_API_BASE_URL}${process.env.YOGA_API_POSES}?name=${params.name}`
  ).then((data) => data);

  const poseData: PoseRecord = await pose.json();

  if (poseData.message) {
    throw new Response("Pose not found", { status: 404 });
  }

  return json({ poseData });
}

export default function Pose() {
  const { poseData } = useLoaderData<typeof loader>();

  return <PoseDetails {...poseData} />;
}
