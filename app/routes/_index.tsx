import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Yoga Poses" },
    { name: "description", content: "Learn new yoga poses!" },
  ];
};

const yogaPoses = [
  // TODO: Add categories to each pose
  // TODO: Add these to DB on Hasura
  {
    name: "Mountain Pose (Tadasana)",
    description:
      "Stand tall with feet together, arms by your sides, and shoulders relaxed. Engage core muscles, lengthen the spine, and reach arms overhead with palms facing each other.",
  },
  {
    name: "Downward-Facing Dog (Adho Mukha Svanasana)",
    description:
      "Start on hands and knees, lift hips toward the ceiling, straighten legs, and press heels towards the floor. Keep the spine straight and head between the arms.",
  },
  {
    name: "Warrior I (Virabhadrasana I)",
    description:
      "Step one foot back, bend the front knee, and extend arms overhead. Square hips to the front, engage the core, and reach energy through fingertips.",
  },
  {
    name: "Tree Pose (Vrikshasana)",
    description:
      "Stand on one leg, bring the sole of the other foot to the inner thigh or calf, and balance. Keep hands in prayer position at the chest or reach them overhead.",
  },
  {
    name: "Child's Pose (Balasana)",
    description:
      "Kneel on the mat, sit back on heels, and reach arms forward with forehead resting on the ground. Relax and breathe deeply to stretch the back and shoulders.",
  },
  {
    name: "Cobra Pose (Bhujangasana)",
    description:
      "Lie on the stomach, place hands under shoulders, and lift the chest while keeping the pelvis on the mat. Elongate the neck and gaze forward for a gentle backbend.",
  },
  {
    name: "Bridge Pose (Setu Bandhasana)",
    description:
      "Lie on your back, bend knees, and place feet hip-width apart. Press through feet to lift hips toward the ceiling. Clasp hands under the back for support.",
  },
  {
    name: "Seated Forward Bend (Paschimottanasana)",
    description:
      "Sit with legs extended, hinge at the hips, and reach forward to grasp the feet or shins. Keep the spine straight and lengthen through the crown of the head.",
  },
  {
    name: "Corpse Pose (Savasana)",
    description:
      "Lie on your back with legs extended and arms by your sides. Close your eyes, relax the entire body, and focus on deep, rhythmic breathing. A pose for total relaxation.",
  },
  {
    name: "Cat-Cow Pose (Marjaryasana-Bitilasana)",
    description:
      "Begin on hands and knees. Inhale, arch the back, and lift the head for Cow Pose. Exhale, round the spine, and tuck the chin for Cat Pose. Flow between the two for a gentle spinal stretch.",
  },
];

export default function Index() {
  const [favoritePoses, setFavoritePoses] = useState<string[]>([]);
  const [filters, setFilters] = useState<string[]>([]);

  const handleToggleFilter = (event) => {
    if (filters.includes(`${event.target.name}`)) {
      setFilters(
        [...filters].filter((name) => name !== `${event.target.name}`)
      );

      return console.log(`❌ ${event.target.name} checked!`);
    }

    setFilters([...filters, `${event.target.name}`]);
    return console.log(`✅ ${event.target.name} checked!!`);
  };

  const handleFavoritePose = (event) => {
    if (favoritePoses.includes(`${event.target.name}`)) {
      setFavoritePoses(
        [...favoritePoses].filter((name) => name !== `${event.target.name}`)
      );

      return console.log(`❌ ${event.target.name} un-favorited!`);
    }

    setFavoritePoses([...favoritePoses, `${event.target.name}`]);
    return console.log(`✅ ${event.target.name} favorited!`);
  };

  return (
    <div>
      <header>
        <h1>Yoga Poses</h1>
        <nav>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Login</a>
            </li>
          </ul>
        </nav>
      </header>

      <div>
        <div>
          <fieldset>
            <legend>
              <h2>Filters</h2>
            </legend>

            <label>
              Pose category 1
              <input
                type="checkbox"
                name="filter1"
                id=""
                onChange={handleToggleFilter}
              />
            </label>
            <label>
              Pose category 2
              <input
                type="checkbox"
                name="filter2"
                id=""
                onChange={handleToggleFilter}
              />
            </label>
            <label>
              Pose category 3
              <input
                type="checkbox"
                name="filter3"
                id=""
                onChange={handleToggleFilter}
              />
            </label>
          </fieldset>
        </div>
        <div>
          <h2>Poses</h2>
          <ul>
            {/* TODO: Fetch poses from database */}
            {yogaPoses.map(({ name, description }) => (
              <li key={name}>
                <h3>
                  {favoritePoses.includes(name) && "❤️"} {name}
                </h3>
                <p>{description}</p>
                <button type="button" onClick={handleFavoritePose} name={name}>
                  Like
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer>
        <p>Created by Adrian Ross</p>
      </footer>
    </div>
  );
}
