import { json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { PoseCategory } from "~/types";
import PosesCategoryList from "~/components/PosesCategoriesList";

// TODO: Fetch poses & fav poses on profile page
// TODO: Add styling to home page, login, signup and profile page

export const meta: MetaFunction = () => {
  return [
    { title: "Yoga Poses" },
    { name: "description", content: "Learn new yoga poses!" },
  ];
};

export const loader = async () => {
  const categories = await fetch(
    `${process.env.YOGA_API_BASE_URL}${process.env.YOGA_API_CATEGORIES}`
  ).then((categoriesData) => categoriesData);

  const categoriesData: PoseCategory[] = await categories.json();

  if (!categoriesData.length) {
    throw new Response("Pose categories not found; Something went wrong!", {
      status: 404,
    });
  }

  return json({ categoriesData });
};

export default function Index() {
  const { categoriesData } = useLoaderData<typeof loader>();

  return (
    <div>
      <h2>Poses by category</h2>
      <Link to="/poses">View all poses</Link>
      <PosesCategoryList categories={categoriesData} />
    </div>
  );
}
