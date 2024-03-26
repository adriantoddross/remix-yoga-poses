import { json, type MetaFunction } from "@remix-run/node";
import { ChangeEvent, useState } from "react";
import { getPoses } from "../data";
import Poses from "~/components/Poses";
import { useLoaderData } from "@remix-run/react";

// TODO: Fetch yoga poses from yoga api for the homepage
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
  // CONST for BASE_URL
  // Fetch
  // Return as json data

  const YOGI_API_BASE_URL = "https://yoga-api-nzy4.onrender.com/v1";
  const YOGI_API_CATEGORIES = "/categories";

  console.log(`${YOGI_API_BASE_URL}${YOGI_API_CATEGORIES}`);
  const getAllCategories = await fetch(
    `${YOGI_API_BASE_URL}${YOGI_API_CATEGORIES}`
  ).then((data) => data);

  const allPoses = await getAllCategories.json();

  const posesData = await getPoses();
  return json({ posesData, allPoses });
};

export default function Index() {
  // get poses from useLoaderData
  const { allPoses } = useLoaderData<typeof loader>();
  console.log(allPoses);

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
        <h2>Poses</h2>
        <Poses />
      </div>
    </div>
  );
}
