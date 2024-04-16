import { Link } from "@remix-run/react";
import { PoseRecord } from "~/types";

type PoseProps = {
  isFavorited: boolean;
} & PoseRecord;

export default function Pose({
  english_name,
  id,
  url_svg,
  isFavorited,
}: PoseProps) {
  return (
    <li>
      <h3>
        {isFavorited ? "❤️" : null} {english_name}
      </h3>
      <img src={url_svg} alt={`Graphic of person doing ${english_name} pose`} />
      <div>
        <Link to={`/poses/${english_name}`}>Learn more</Link>
        <label>
          <button type="submit" name="pose_id" value={id}>
            {isFavorited ? "Un-favorite pose" : "Favorite pose"}
          </button>
        </label>
      </div>
    </li>
  );
}
