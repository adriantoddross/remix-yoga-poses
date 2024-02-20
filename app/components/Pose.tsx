import { PoseMutation } from "~/data";

type PoseProps = PoseMutation & {
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Pose = ({ name, id, description, favorite, handleClick }: PoseProps) => {
  return (
    <>
      <h3>{favorite ? `❤️ ${name}` : name}</h3>
      <p>{description}</p>
      {handleClick ? (
        <button type="button" onClick={handleClick} name={name} value={id}>
          Like
        </button>
      ) : null}
    </>
  );
};

export default Pose;
