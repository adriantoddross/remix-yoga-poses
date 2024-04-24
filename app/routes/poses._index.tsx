import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  json,
} from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { ChangeEvent, useCallback, useState } from "react";
import Pose from "~/components/Pose";
import { PoseCategory, PoseRecord } from "~/types";
import { createSupabaseServerClient } from "../supabase/serverClient";
import { getFavoritePoses } from "~/supabase/clientQueries";
import { fetchCategories, fetchPoses } from "~/api/posesApi";
import { useUser } from "~/root";

export const meta: MetaFunction = () => {
  return [
    { title: "Yoga Poses" },
    { name: "description", content: "View all poses" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const { supabase } = createSupabaseServerClient(request);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const body = await request.formData();
  const poseId = body.get("pose_id");
  const userId = session?.user.id;

  const { error } = await supabase
    .from("favorite_poses")
    .insert([{ pose_id: poseId, user_id: userId }])
    .select("*");

  if (error?.code === "23505") {
    // If we receive a unique key constraint error, remove the Favorite pose instead.
    const { error } = await supabase
      .from("favorite_poses")
      .delete()
      .eq("pose_id", poseId)
      .eq("user_id", userId);

    return error;
  }

  return error;
  // TODO: Handle error
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabase } = createSupabaseServerClient(request);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const [poses, categories, favoritePoses] = await Promise.all([
    fetchPoses(),
    fetchCategories(),
    getFavoritePoses(supabase, session),
  ]);

  const categoriesData: PoseCategory[] = await categories.json();
  const posesData: PoseRecord[] = await poses.json();

  if (favoritePoses?.error) {
    throw new Response(
      favoritePoses?.error.message ??
        "There was a problem with favoriting a pose.",
      {
        status: 500,
      }
    );
  }

  if (!poses) {
    throw new Response("Poses not found; Something went wrong!", {
      status: 404,
    });
  }

  if (!categoriesData.length) {
    throw new Response("Pose categories not found; Something went wrong!", {
      status: 404,
    });
  }

  return json({
    posesData,
    categoriesData,
    favoritePoses,
  });
}

type PosesData = {
  poses: PoseRecord[];
  filters: Set<string>;
};

export default function Category() {
  const { posesData, categoriesData, favoritePoses } =
    useLoaderData<typeof loader>();

  const fetcher = useFetcher();
  const { userIsLoggedIn } = useUser();

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

      {userIsLoggedIn ? (
        <fetcher.Form method="post">
          <ul>
            {poses.poses.map((pose) => {
              const { id } = pose;
              return (
                <Pose
                  key={id}
                  isFavorited={!!favoritePoses?.data?.includes(pose.id)}
                  {...pose}
                />
              );
            })}
          </ul>
        </fetcher.Form>
      ) : (
        <ul>
          {poses.poses.map((pose) => {
            const { id } = pose;
            return <Pose key={id} variant="signup" {...pose} />;
          })}
        </ul>
      )}
    </section>
  );
}
