import { FirebaseError } from "firebase/app";
import { useCallback } from "react";
import { AlertTypes, strings } from "../utils/constants";
import useAlert from "./alertHook";

const useError = () => {
  const _alert = useAlert().showAlert;

  const handleError = useCallback(
    (error: unknown) => {
      let errorCode: any;
      if (error instanceof FirebaseError) {
        const err: FirebaseError = error as FirebaseError;
        errorCode = err.code;
      } else if (typeof error === "string") {
        errorCode = error;
      } else {
        errorCode = strings.DEFAULT_ERROR;
      }
      _alert({
        type: AlertTypes.Error,
        message: errorCode,
      });
    },
    [_alert]
  );

  return {
    handleError,
  };
};

export default useError;
