import React from "react";
import BackArrow from "../components/BackArrow";
import CustomAlert from "../components/CustomAlert";
import CustomForm from "../components/CustomForm";
import CustomFormEmail from "../components/CustomFormEmail";
import CustomFormNickname from "../components/CustomFormNickname";
import CustomFormPassword from "../components/CustomFormPassword";
import Header from "../components/Header";
import Main from "../components/Main";
import useForm from "../hooks/formHook";
import useRoutes from "../hooks/routesHook";
import useUser from "../hooks/userHook";
import { strings } from "../utils/constants";

const SignUpView: React.FC = () => {
  const _user = useUser();
  const _form = useForm();
  const _routes = useRoutes();

  return (
    <>
      <Header back={<BackArrow route={_routes.goToSignInView} />} />
      <CustomAlert />
      <Main>
        <CustomForm
          title={strings.CREATE_ACCOUNT}
          onSubmit={(event) =>
            _form.handleUserSubmit(event, () =>
              _user.signUpUser(
                _form.formData.email,
                _form.formData.password as string,
                _form.formData.nickname
              )
            )
          }
        >
          <CustomFormEmail
            id="email-2"
            value={_form.formData.email}
            onChange={(event) => _form.handleEmail(event)}
          />
          <CustomFormPassword
            id="password-2"
            value={_form.formData.password as string}
            label={true}
            onChange={(event) => _form.handlePassword(event)}
            visibility={_form.isVisible}
            setVisibility={() => _form.setIsVisible(!_form.isVisible)}
          />
          <CustomFormNickname
            id="nickname-2"
            value={_form.formData.nickname}
            onChange={(event) => _form.handleNickname(event)}
          />
          <div className="mt-5 d-flex justify-content-between">
            <button
              type="submit"
              className="btn btn-outline-warning text-capitalize w-100"
            >
              {strings.SIGN_UP}
            </button>
          </div>
        </CustomForm>
        <div
          className="alert alert-info alert-dismissible fade show"
          role="alert"
          style={{ position: "fixed", top: "100px" }}
        >
          {strings.APP_INFO}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      </Main>
    </>
  );
};

export default SignUpView;
