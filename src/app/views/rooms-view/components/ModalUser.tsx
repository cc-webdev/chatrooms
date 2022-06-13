import React from "react";
import CustomFormNickname from "../../../components/CustomFormNickname";
import CustomModal from "../../../components/CustomModal";
import useForm from "../../../hooks/formHook";
import useUserListener from "../../../hooks/userListenerHook";
import useUser from "../../../hooks/userHook";
import { useAppDispatch, useAppSelector } from "../../../store";
import { icons, strings } from "../../../utils/constants";
import { setDelete } from "../../../reducers/deleteSlice";

const ModalUser: React.FC = () => {
  const _delete = useAppSelector((state) => state.delete);
  const _dispatch = useAppDispatch();
  const _form = useForm();
  const _user = useUser();
  const _userData = useAppSelector((state) => state.user);

  useUserListener();

  return (
    <CustomModal id="modalUser" title={strings.EDIT_ACCOUNT}>
      <div className="modal-body">
        {/* Email */}
        <div className="mb-3 d-flex text-light pt-3 pb-3 border-bottom">
          <label
            htmlFor="email"
            className="col-sm-2 col-form-label text-capitalize"
          >
            {strings.EMAIL}:
          </label>
          <div className="w-100">
            <input
              type="text"
              readOnly
              className="form-control-plaintext text-light ps-3"
              id="email"
              value={_userData?.email}
            />
          </div>
        </div>
        <form
          onSubmit={(event) =>
            _form.handleUserSubmit(event, () =>
              _user.updateUserNickname(_form.formData.nickname)
            )
          }
        >
          {/* Nickname */}
          <CustomFormNickname
            id={"modalNickname"}
            value={_form.formData.nickname}
            placeholder={_userData?.nickname}
            onChange={(event) => _form.handleNickname(event)}
          />
          <div className="mb-4 border-0 text-end" style={{ minWidth: "90px" }}>
            <button
              type="submit"
              className="btn btn-outline-success text-capitalize"
              style={{ minWidth: "90px" }}
            >
              {strings.EDIT}
            </button>
          </div>
        </form>
        {/* Account */}
        <div className="d-flex justify-content-between align-items-center pt-4 pb-3 border-top">
          <div className="text-light m-0">
            <h6 className="m-0 text-capitalize">{strings.ACCOUNT}</h6>
          </div>
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center">
                <span
                  role="button"
                  className="text-danger m-0 me-3"
                  onClick={() => _dispatch(setDelete(true))}
                >
                  {icons.UNLOCK}
                </span>
              </div>
              <button
                type="button"
                className="btn btn-outline-danger text-capitalize"
                onClick={() => _user.deleteAccount(_userData.id)}
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ minWidth: "90px" }}
                disabled={!_delete}
              >
                {strings.DELETE}
              </button>
            </div>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default ModalUser;
