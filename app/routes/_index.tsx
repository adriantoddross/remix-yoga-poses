import { json, type MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { getPoses } from "../data";
import Poses from "~/components/Poses";

export const meta: MetaFunction = () => {
  return [
    { title: "Yoga Poses" },
    { name: "description", content: "Learn new yoga poses!" },
  ];
};

export const loader = async () => {
  const poses = await getPoses();
  return json({ poses });
};

export default function Index() {
  const [filters, setFilters] = useState<string[]>([]);
  const handleToggleFilter = (event) => {
    if (filters.includes(`${event.target.name}`)) {
      setFilters(
        [...filters].filter((name) => name !== `${event.target.name}`)
      );

      return console.log(`❌ ${event.target.name} checked!`);
    }

    setFilters([...filters, `${event.target.name}`]);
    return console.log(`✅ ${event.target.name} checked!!`);
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
