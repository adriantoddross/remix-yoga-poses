import { PoseRecord } from "~/data";
import Pose from "./Pose";
import { useState } from "react";
import { useLoaderData } from "@remix-run/react";

const Poses = () => {
  const { poses } = useLoaderData<typeof loader>();
  const [favoritePoses, setFavoritePoses] = useState<string[]>([]);

  const handleFavoritePose = (event) => {
    event.preventDefault();

    if (favoritePoses.includes(`${event.currentTarget.value}`)) {
      setFavoritePoses(
        [...favoritePoses].filter((id) => id !== `${event.currentTarget.value}`)
      );
    } else {
      setFavoritePoses([...favoritePoses, `${event.currentTarget.value}`]);
    }
  };

  return (
    <ul>
      {poses.length ? (
        poses.map(({ name, id, description }: PoseRecord) => (
          <li key={id}>
            <Pose
              id={id}
              name={name}
              description={description}
              favorite={favoritePoses.includes(id)}
              handleClick={handleFavoritePose}
            />
          </li>
        ))
      ) : (
        <p>No poses</p>
      )}
    </ul>
  );
};

export default Poses;
