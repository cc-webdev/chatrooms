import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

interface Props {
  children: ReactNode;
  id: string;
  title: string;
}

const CustomModal: React.FC<Props> = ({ children, id, title }) => {
  const _modal = (
    <div
      className="modal fade"
      id={id}
      tabIndex={-1}
      aria-labelledby={id}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-dark user-select-none">
          <div className="modal-header">
            <h5 className="modal-title text-warning" id={id}>
              {title}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    _modal,
    document.getElementById("modal-root") as Element
  );
};

export default CustomModal;
