import { Link } from "@remix-run/react";
import { PoseRecord } from "~/types";

type PoseProps = PoseRecord & {
  handleFavoriteClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Pose({
  english_name,
  id,
  url_svg,
  handleFavoriteClick,
}: PoseProps) {
  return (
    <li>
      <h3>{english_name}</h3>
      <img src={url_svg} alt={`Graphic of person doing ${english_name} pose`} />
      <div>
        <Link to={`/poses/${english_name}`}>Learn more</Link>
        <button type="button" onClick={handleFavoriteClick} value={id}>
          Favorite
        </button>
      </div>
    </li>
  );
}
