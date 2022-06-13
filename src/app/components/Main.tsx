import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const Main: React.FC<Props> = ({ children }) => {
  return (
    <main
      id="main"
      className="user-select-none bg-dark d-flex flex-grow-1 justify-content-center"
      style={{ height: "90vh" }}
    >
      {children}
    </main>
  );
};

export default Main;
