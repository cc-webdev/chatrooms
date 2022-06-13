import React from "react";
import useForm from "../hooks/formHook";

import { icons, strings } from "../utils/constants";

interface Props {
  id: string;
  value: string;
  label: boolean;
  visibility: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setVisibility: () => void;
}

const CustomFormPassword: React.FC<Props> = ({
  id,
  value,
  visibility,
  onChange,
  setVisibility,
}) => {
  const _form = useForm();

  return (
    <>
      <div className="mb-3 text-light text-capitalize">
        <label htmlFor={id}>{strings.PASSWORD}</label>
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text">{icons.LOCK}</span>
        <input
          type={visibility ? "text" : "password"}
          className="form-control"
          id={id}
          placeholder={strings.PASSWORD_PLACEHOLDER}
          value={value}
          minLength={6}
          maxLength={12}
          onChange={onChange}
          onKeyDown={_form.handleSpacePress}
          required
        />
        <span
          className="input-group-text"
          role={"button"}
          onClick={setVisibility}
        >
          {visibility ? icons.EYE : icons.EYE_SLASH}
        </span>
      </div>
    </>
  );
};

export default CustomFormPassword;
