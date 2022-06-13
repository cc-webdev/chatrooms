import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { routes } from "../utils/constants";

const useRoutes = () => {
  const currentRoute = useLocation();
  const _navigate = useNavigate();

  const goToRoomView = useCallback(
    (roomID: string) => _navigate(`${routes.ROOM}${roomID}`),
    [_navigate]
  );

  const goToRoomsView = useCallback(() => _navigate(routes.ROOMS), [_navigate]);

  const goToSignInView = () => _navigate(routes.SIGN_IN);

  const goToSignUpView = () => _navigate(routes.SIGN_UP);

  return {
    currentRoute,
    goToRoomView,
    goToRoomsView,
    goToSignInView,
    goToSignUpView,
  };
};

export default useRoutes;
