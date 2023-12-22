import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Yoga Poses" },
    { name: "description", content: "Learn new yoga poses!" },
  ];
};

export default function Index() {
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
              <input type="checkbox" name="" id="" />
            </label>
            <label>
              Pose category 2
              <input type="checkbox" name="" id="" />
            </label>
            <label>
              Pose category 3
              <input type="checkbox" name="" id="" />
            </label>
          </fieldset>
        </div>
        <div>
          <h2>Poses</h2>
          <ul>
            <li>
              <h3>Pose title</h3>
              <p>Pose description/instruction</p>
              <div>Image</div>
            </li>
          </ul>
        </div>
      </div>

      <footer>
        <p>Created by Adrian Ross</p>
      </footer>
    </div>
  );
}
