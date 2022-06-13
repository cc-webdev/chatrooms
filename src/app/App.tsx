import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Spinner from "./components/Spinner";
import { routes, strings } from "./utils/constants";
import useAuth from "./hooks/authHook";

const RoomView = React.lazy(() => import("./views/room-view/RoomView"));
const RoomsView = React.lazy(() => import("./views/rooms-view/RoomsView"));
const SignInView = React.lazy(() => import("./views/signIn-view/SignInView"));
const SignUpView = React.lazy(() => import("./views/SignUpView"));
const PageNotFound = React.lazy(() => import("./views/PageNotFound"));

const App: React.FC = () => {
  const _auth = useAuth().isAuth;

  useAuth();

  return (
    <Suspense fallback={<Spinner />}>
      <BrowserRouter basename={process.env.REACT_APP_BASE_URL}>
        <Routes>
          <Route
            path={routes.ROOMS}
            element={_auth ? <RoomsView /> : <Navigate to={routes.SIGN_IN} />}
          />
          <Route
            path={`${routes.ROOM}:roomID`}
            element={_auth ? <RoomView /> : <Navigate to={routes.SIGN_IN} />}
          />
          <Route
            path={routes.SIGN_IN}
            element={_auth ? <Navigate to={routes.ROOMS} /> : <SignInView />}
          />
          <Route
            path={routes.SIGN_UP}
            element={_auth ? <Navigate to={routes.ROOMS} /> : <SignUpView />}
          />
          <Route
            path="*"
            element={
              <PageNotFound
                errorNumber={strings.PAGE_NOT_FOUND_NUMBER}
                errorMessage={strings.PAGE_NOT_FOUND_ERROR}
                buttonText={strings.BACK_TO_HOMEPAGE}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
