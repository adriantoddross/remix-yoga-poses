import { PoseRecord } from "~/data";
import Pose from "./Pose";
import { useContext } from "react";
import { useLoaderData } from "@remix-run/react";
import { loader } from "~/routes/_index";
import { globalContext } from "~/context/globalContext";

const Poses = () => {
  const { posesData } = useLoaderData<typeof loader>();
  const { favoritePoses, setFavoritePoses } = useContext(globalContext);

  const handleFavoritePose = (event: React.MouseEvent<HTMLButtonElement>) => {
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
      {posesData.length ? (
        posesData.map(({ name, id, description }: PoseRecord) => (
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
