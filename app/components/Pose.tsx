import { PoseMutation } from "~/data";

type PoseProps = PoseMutation & {
  handleClick: (event) => void;
};

const Pose = ({ name, id, description, favorite, handleClick }: PoseProps) => {
  return (
    <>
      <h3>{favorite ? `❤️ ${name}` : name}</h3>
      <p>{description}</p>
      <button type="button" onClick={handleClick} name={name} value={id}>
        Like
      </button>
    </>
  );
};

export default Pose;
