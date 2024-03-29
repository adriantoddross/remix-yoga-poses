import { PoseRecord } from "~/types";

export default function PoseDetails({
  english_name,
  pose_description,
  pose_benefits,
  sanskrit_name,
  url_svg,
}: PoseRecord) {
  return (
    <section>
      <div>
        <h2>{english_name}</h2>
        <h3>{sanskrit_name}</h3>
        <img
          src={url_svg}
          alt={`Graphic of person doing ${english_name} pose`}
        />
      </div>

      <section>
        <h3>Description</h3>
        <p>{pose_description}</p>
      </section>

      <section>
        <h3>Benefits</h3>
        <p>{pose_benefits}</p>
      </section>
    </section>
  );
}
