import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  icon: ReactNode;
  id: string;
}

const ButtonCircleDropdown: React.FC<Props> = ({ children, icon, id }) => {
  return (
    <div>
      <div className="dropdown">
        <button
          className="btn btn-primary-outline rounded-circle me-1"
          type="button"
          id={id}
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="text-warning">{icon}</span>
        </button>
        {children}
      </div>
    </div>
  );
};

export default ButtonCircleDropdown;
