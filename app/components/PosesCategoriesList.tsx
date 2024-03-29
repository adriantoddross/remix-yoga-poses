import { Link } from "@remix-run/react";
import { PoseCategory } from "~/types";

type PosesCategoryListProps = {
  categories: PoseCategory[];
};

export default function PosesCategoryList({
  categories,
}: PosesCategoryListProps) {
  return (
    <ul>
      {categories.map(
        ({ category_description, category_name, id }: PoseCategory) => {
          console.log(category_name);

          return (
            <li key={id}>
              <h2>
                <Link to={`poses/category/${category_name}`}>
                  {category_name}
                </Link>
              </h2>
              <p>{category_description}</p>
            </li>
          );
        }
      )}
    </ul>
  );
}
