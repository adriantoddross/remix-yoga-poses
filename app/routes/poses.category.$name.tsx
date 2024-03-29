import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Pose from "~/components/Pose";
import { PoseCategory } from "~/types";

export async function loader({ params }: LoaderFunctionArgs) {
  const getCategory = await fetch(
    `${process.env.YOGA_API_BASE_URL}${process.env.YOGA_API_CATEGORIES}?name=${params.name}`
  ).then((data) => data);

  const category: PoseCategory = await getCategory.json();

  return json({ category });
}

export default function Category() {
  const { category } = useLoaderData<typeof loader>();
  const { category_name, category_description, poses } = category;

  return (
    <section>
      <h2>{category_name}</h2>
      <p>{category_description}</p>
      <ul>
        {poses.map((pose) => {
          const { id } = pose;
          return <Pose key={id} {...pose} />;
        })}
      </ul>
    </section>
  );
}
