import React from "react";

import Header from "../components/Header";
import Main from "../components/Main";
import useRoutes from "../hooks/routesHook";

interface Props {
  errorNumber: String;
  errorMessage: String;
  buttonText: String;
}

const PageNotFound: React.FC<Props> = ({
  errorNumber,
  errorMessage,
  buttonText,
}) => {
  const _routes = useRoutes();

  return (
    <>
      <Header />
      <Main>
        <div className="container text-center m-auto">
          <div className="mb-5">
            <h1 className="display-1 text-warning">{errorNumber}</h1>
            <h1 className="display-4 text-warning">{errorMessage}</h1>
          </div>
          <button
            type="button"
            className="btn btn-warning text-uppercase fw-bold"
            onClick={_routes.goToRoomsView}
          >
            {buttonText}
          </button>
        </div>
      </Main>
    </>
  );
};

export default PageNotFound;
