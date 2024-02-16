import { createContext } from "react";
import { PoseRecord } from "~/data";

type globalContextProps = {
  favoritePoses: PoseRecord["id"][];
  setFavoritePoses: React.Dispatch<React.SetStateAction<PoseRecord["id"][]>>;
};
export const globalContext = createContext<globalContextProps>({
  favoritePoses: [],
  setFavoritePoses: () => {},
});
