import React, { ReactNode } from "react";

import { strings } from "../utils/constants";

interface Props {
  actions?: ReactNode;
  back?: ReactNode;
}

const Header: React.FC<Props> = ({ actions, back }) => {
  return (
    <header
      className="user-select-none align-content-center"
      style={{ height: "10vh" }}
    >
      <nav className="navbar bg-black p-0 h-100">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            {back}
            <div className="navbar-brand d-flex align-items-baseline">
              <span
                style={{ fontFamily: "Caveat, cursive" }}
                className="me-2 text-warning"
              >
                <h1 className="m-0">{strings.APP_NAME_CHAT}</h1>
              </span>
              <span className="text-light">
                <h4 className="m-0">{strings.APP_NAME_ROOMS}</h4>
              </span>
            </div>
          </div>
          {actions}
        </div>
      </nav>
    </header>
  );
};

export default Header;
