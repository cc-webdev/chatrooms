import React from "react";
import CustomAlert from "../../components/CustomAlert";
import CustomForm from "../../components/CustomForm";
import CustomFormEmail from "../../components/CustomFormEmail";
import CustomFormPassword from "../../components/CustomFormPassword";
import Main from "../../components/Main";
import useForm from "../../hooks/formHook";
import useOfflineUsers from "../../hooks/offlineUsersHook";
import useRoutes from "../../hooks/routesHook";
import useUser from "../../hooks/userHook";
import { strings } from "../../utils/constants";
import ModalPassword from "./components/ModalPassword";

const SignInView: React.FC = () => {
  const _form = useForm();
  const _routes = useRoutes();
  const _user = useUser();

  useOfflineUsers();

  return (
    <>
      <ModalPassword />
      <CustomAlert />
      <Main>
        <CustomForm
          title={strings.SIGN_IN}
          onSubmit={(event) => {
            _form.handleUserSubmit(event, () =>
              _user.signInUser(
                _form.formData.email,
                _form.formData.password as string
              )
            );
          }}
        >
          <CustomFormEmail
            id="email-1"
            value={_form.formData.email}
            onChange={(event) => _form.handleEmail(event)}
          />
          <CustomFormPassword
            id="password-1"
            value={_form.formData.password as string}
            label={true}
            onChange={(event) => _form.handlePassword(event)}
            visibility={_form.isVisible}
            setVisibility={() => _form.setIsVisible(!_form.isVisible)}
          />
          <div className="d-flex justify-content-end">
            <span
              role={"button"}
              className="text-light"
              aria-controls="modal"
              data-bs-toggle="modal"
              data-bs-target="#modalPassword"
            >
              {strings.FORGOT_PASSWORD}
            </span>
          </div>
          <div className="mt-5 d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-outline-success text-capitalize"
              onClick={_routes.goToSignUpView}
            >
              {strings.SIGN_UP}
            </button>
            <button
              type="submit"
              className="btn btn-outline-warning text-capitalize"
            >
              {strings.SIGN_IN}
            </button>
          </div>
        </CustomForm>
      </Main>
    </>
  );
};

export default SignInView;
