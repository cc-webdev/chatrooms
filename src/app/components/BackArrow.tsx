import React from "react";
import { icons } from "../utils/constants";

interface Props {
  route: () => void;
}

const BackArrow: React.FC<Props> = ({ route }) => {
  return (
    <div>
      <span
        role="button"
        className="text-warning rounded-circle ms-2 me-2"
        onClick={route}
      >
        {icons.ARROW_LEFT}
      </span>
    </div>
  );
};

export default BackArrow;
