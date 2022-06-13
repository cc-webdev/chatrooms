import React from "react";
import ReactDOM from "react-dom";
import { useAppSelector } from "../store";

import { AlertTypes, icons } from "../utils/constants";

const CustomAlert: React.FC = () => {
  const _alertData = useAppSelector((state) => state.alert);

  const _alert = _alertData.message.length ? (
    <div
      className="w-100 position-absolute centerView"
      style={{
        top: "120px",
        padding: "30px 10px",
        maxWidth: "320px",
        zIndex: "9999",
      }}
    >
      <div
        className={`${
          _alertData.type === AlertTypes.Success
            ? AlertTypes.SuccessClass
            : AlertTypes.ErrorClass
        } d-flex align-items-center m-auto fade show`}
        role="alert"
      >
        <div className="me-3">
          {_alertData.type === AlertTypes.Success
            ? icons.CHECK_CIRCLE_FILL
            : icons.EXCLAMATION_TRIANGLE}
        </div>
        <div>{_alertData.message}</div>
      </div>
    </div>
  ) : null;

  return ReactDOM.createPortal(
    _alert,
    document.getElementById("alert-root") as Element
  );
};

export default CustomAlert;
