import { PoseRecord } from "~/types";

export default function Pose({ english_name, pose_description }: PoseRecord) {
  return (
    <li>
      <h3>{english_name}</h3>
      <p>{pose_description}</p>
    </li>
  );
}
