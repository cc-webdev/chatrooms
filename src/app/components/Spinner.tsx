import React from "react";

import { strings } from "../utils/constants";

import Main from "./Main";

const Spinner: React.FC = () => {
  return (
    <Main>
      <div className="spinner-border text-warning m-auto" role="status">
        <span className="visually-hidden spinnerText text-capitalize">
          {strings.LOADING}
        </span>
      </div>
      ;
    </Main>
  );
};

export default Spinner;
