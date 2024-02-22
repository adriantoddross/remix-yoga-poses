import { PoseRecord } from "~/data";
import Pose from "./Pose";
import { useContext } from "react";
import { useLoaderData } from "@remix-run/react";
import { loader } from "~/routes/_index";
import { globalContext } from "~/context/globalContext";

const PosesList = ({ poses }: { poses: PoseRecord[] }) => {
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

  return poses.map(({ name, id, description }: PoseRecord) => (
    <li key={id}>
      <Pose
        id={id}
        name={name}
        description={description}
        favorite={favoritePoses.includes(id)}
        handleClick={handleFavoritePose}
      />
    </li>
  ));
};

const Poses = ({ poses }: { poses: PoseRecord[] }) => {
  const { posesData } = useLoaderData<typeof loader>();

  if (poses?.length) {
    return (
      <ul>
        <PosesList poses={poses} />
      </ul>
    );
  }

  if (posesData?.length) {
    return (
      <ul>
        <PosesList poses={posesData} />
      </ul>
    );
  }

  return <p>No poses</p>;
};

export default Poses;
