import React from "react";

import useForm from "../hooks/formHook";
import { icons, strings } from "../utils/constants";

interface Props {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomFormEmail: React.FC<Props> = ({ id, value, onChange }) => {
  const _form = useForm();

  return (
    <>
      <div className="mb-3 text-light text-capitalize">
        <label htmlFor={id}>{strings.EMAIL}</label>
      </div>
      <div className="mb-3 input-group">
        <span className="input-group-text">{icons.EMAIL}</span>
        <input
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"
          type="email"
          className="form-control"
          id={id}
          placeholder={strings.EMAIL_PLACEHOLDER}
          value={value}
          onChange={onChange}
          onKeyDown={_form.handleSpacePress}
          required
        />
      </div>
    </>
  );
};

export default CustomFormEmail;
