import { MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ChangeEvent, useCallback, useState } from "react";
import Pose from "~/components/Pose";
import { PoseCategory, PoseRecord } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: "Yoga Poses" },
    { name: "description", content: "View all poses" },
  ];
};

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

type PosesData = {
  poses: PoseRecord[];
  filters: Set<string>;
};

export default function Category() {
  const { posesData, categoriesData } = useLoaderData<typeof loader>();

  const [poses, setPoses] = useState<PosesData>({
    poses: posesData,
    filters: new Set<string>(),
  });

  const handleFilterChange = useCallback(
    (
      event: ChangeEvent<HTMLInputElement> & {
        currentTarget: HTMLInputElement;
      }
    ) => {
      setPoses((previousState) => {
        const filters = new Set(previousState.filters);

        if (event.target.checked) {
          filters.add(event.target.value);
        } else {
          filters.delete(event.target.value);
        }

        if (filters.size === 0)
          return {
            filters,
            poses: posesData,
          };

        const filteredPoses = categoriesData
          .filter(({ category_name }) => {
            return filters.has(category_name);
          })
          .map(({ poses }) => poses.map((pose: PoseRecord) => pose))
          .flat()
          .filter(
            (pose1, index, poses) =>
              poses.findIndex((pose2) => pose1.id === pose2.id) === index
          );

        return {
          filters,
          poses: filteredPoses,
        };
      });
    },
    [setPoses, categoriesData, posesData]
  );

  return (
    <section>
      <h2>Poses</h2>

      <div>
        <fieldset>
          <legend>
            <h2>Filter by category</h2>
          </legend>

          {categoriesData.map(({ category_name, id }) => {
            return (
              <label key={id}>
                {category_name}
                <input
                  type="checkbox"
                  name={category_name}
                  id={category_name}
                  value={category_name}
                  onChange={handleFilterChange}
                />
              </label>
            );
          })}
        </fieldset>
      </div>

      <ul>
        {poses.poses.map((pose) => {
          const { id } = pose;
          return <Pose key={id} {...pose} />;
        })}
      </ul>
    </section>
  );
}
