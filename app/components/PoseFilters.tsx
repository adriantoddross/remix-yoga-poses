import { ChangeEvent, useCallback } from "react";
import { PoseCategory, PoseRecord, PosesData } from "~/types";

export default function PosesFilters({
  setStateAction,
  posesData,
  categoriesData,
}: {
  setStateAction: (value: React.SetStateAction<PosesData>) => void;
  posesData: PoseRecord[];
  categoriesData: PoseCategory[];
}) {
  const handleFilterChange = useCallback(
    (
      event: ChangeEvent<HTMLInputElement> & {
        currentTarget: HTMLInputElement;
      }
    ) => {
      setStateAction((previousState: PosesData) => {
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

        // Filter poses by category, flatten the category array of poses, then remove duplicate poses.
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
    [setStateAction, categoriesData, posesData]
  );

  return (
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
  );
}
