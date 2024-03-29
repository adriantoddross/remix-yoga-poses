import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ChangeEvent, useState } from "react";
import Pose from "~/components/Pose";
import { PoseCategory, PoseRecord } from "~/types";

export async function loader() {
  const poses = await fetch(
    `${process.env.YOGA_API_BASE_URL}${process.env.YOGA_API_POSES}`
  ).then((data) => data);

  const categories = await fetch(
    `${process.env.YOGA_API_BASE_URL}${process.env.YOGA_API_CATEGORIES}`
  ).then((categoriesData) => categoriesData);

  const categoriesData: PoseCategory[] = await categories.json();

  const posesData: PoseRecord[] = await poses.json();

  if (!poses) {
    throw new Response("Poses not found", { status: 404 });
  }

  if (!categoriesData.length) {
    throw new Response("Pose categories not found; Something went wrong!", {
      status: 404,
    });
  }

  return json({ posesData, categoriesData });
}

type PosesData = PoseRecord[] | PoseCategory["poses"];
type Pose = PoseRecord & PoseCategory["poses"];

export default function Category() {
  const { posesData, categoriesData } = useLoaderData<typeof loader>();

  const [poses, setPoses] = useState<PosesData>(posesData);
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
    <section>
      <h2>Poses</h2>

      <div>
        <fieldset>
          <legend>
            <h2>Filters</h2>
          </legend>

          {categoriesData.map(({ category_name, id }) => {
            return (
              <label key={id}>
                {category_name}
                <input
                  type="checkbox"
                  name={category_name}
                  id={category_name}
                  value={id}
                  onChange={handleToggleFilter}
                />
              </label>
            );
          })}
        </fieldset>
      </div>

      <ul>
        {poses.map((pose) => {
          const { id } = pose;
          return <Pose key={id} {...pose} />;
        })}
      </ul>
    </section>
  );
}
