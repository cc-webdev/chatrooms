import { useCallback } from "react";
import { AlertModel, defaultAlert } from "../models/AlertModel";
import { setAlert } from "../reducers/alertSlice";
import { useAppDispatch } from "../store";

const useAlert = () => {
  const _dispatch = useAppDispatch();

  const showAlert = useCallback(
    (alert: AlertModel) => {
      _dispatch(setAlert(alert));
      setTimeout(() => {
        _dispatch(setAlert(defaultAlert));
      }, 3000);
    },
    [_dispatch]
  );
  return { showAlert };
};

export default useAlert;
