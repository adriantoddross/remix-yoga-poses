import { json, type MetaFunction } from "@remix-run/node";
import { ChangeEvent, useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { PoseCategory } from "~/types";
import PosesCategoryList from "~/components/PosesCategoriesList";

// TODO: ✅ Fetch yoga poses from yoga api for the homepage
// TODO: Set up DB table to allow users to favorite yoga poses
// TODO: Filter poses by category
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

  if (!categories) {
    throw new Response("Pose categories not found; Something went wrong!", {
      status: 404,
    });
  }

  const categoriesData: PoseCategory[] = await categories.json();

  return json({ categoriesData });
};

export default function Index() {
  const { categoriesData } = useLoaderData<typeof loader>();

  const [filters, setFilters] = useState<string[]>([]);
  const handleToggleFilter = (
    event: ChangeEvent<HTMLInputElement> & {
      currentTarget: HTMLInputElement;
    }
  ) => {
    if (filters.includes(`${event.currentTarget.name}`)) {
      setFilters(
        [...filters].filter((name) => name !== `${event.currentTarget.name}`)
      );

      return console.log(`❌ ${event.currentTarget.name} checked!`);
    }

    setFilters([...filters, `${event.currentTarget.name}`]);
    return console.log(`✅ ${event.currentTarget.name} checked!!`);
  };

  return (
    <div>
      <div>
        <fieldset>
          <legend>
            <h2>Filters</h2>
          </legend>

          <label>
            Pose category 1
            <input
              type="checkbox"
              name="filter1"
              id=""
              onChange={handleToggleFilter}
            />
          </label>
          <label>
            Pose category 2
            <input
              type="checkbox"
              name="filter2"
              id=""
              onChange={handleToggleFilter}
            />
          </label>
          <label>
            Pose category 3
            <input
              type="checkbox"
              name="filter3"
              id=""
              onChange={handleToggleFilter}
            />
          </label>
        </fieldset>
      </div>
      <div>
        <h2>Poses by category</h2>
        <PosesCategoryList categories={categoriesData} />
      </div>
    </div>
  );
}
