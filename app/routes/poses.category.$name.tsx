import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import Pose from "~/components/Pose";
import { PoseCategory } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: "Yoga Poses" },
    { name: "description", content: "View categories of poses" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  invariant(params.name, "Missing category name param");

  const category = await fetch(
    `${process.env.YOGA_API_BASE_URL}${process.env.YOGA_API_CATEGORIES}?name=${params.name}`
  ).then((data) => data);

  const categoryData: PoseCategory = await category.json();

  if (!categoryData.poses.length) {
    throw new Response("Category not found", { status: 404 });
  }

  return json({ categoryData });
}

export default function Category() {
  const { categoryData } = useLoaderData<typeof loader>();
  const { category_name, category_description, poses } = categoryData;

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
