import React from "react";
import CustomFormEmail from "../../../components/CustomFormEmail";
import CustomModal from "../../../components/CustomModal";
import useForm from "../../../hooks/formHook";
import useUser from "../../../hooks/userHook";
import { strings } from "../../../utils/constants";

const ModalPassword: React.FC = () => {
  const _form = useForm();
  const _user = useUser();
  return (
    <CustomModal id="modalPassword" title={strings.FORGOT_PASSWORD}>
      <form
        className="p-3"
        onSubmit={(event) =>
          _form.handleUserSubmit(event, () =>
            _user.resetPassword(_form.formData.email)
          )
        }
      >
        <CustomFormEmail
          id={"emailPassword"}
          value={_form.formData.email}
          onChange={_form.handleEmail}
        />
        <div className="d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-outline-success text-capitalize"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            {strings.SEND}
          </button>
        </div>
      </form>
    </CustomModal>
  );
};

export default ModalPassword;
