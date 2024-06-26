import { Link } from "@remix-run/react";
import { PoseRecord } from "~/types";

export default function Pose({ english_name, url_svg }: PoseRecord) {
  return (
    <li>
      <h3>{english_name}</h3>
      <img src={url_svg} alt={`Graphic of person doing ${english_name} pose`} />
      <div>
        <Link to={`/poses/${english_name}`}>Learn more</Link>
      </div>
    </li>
  );
}
