import React from "react";

import useForm from "../hooks/formHook";
import { strings } from "../utils/constants";

interface Props {
  id: string;
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomFormNickname: React.FC<Props> = ({
  id,
  value,
  placeholder,
  onChange,
}) => {
  const _form = useForm();

  return (
    <>
      <div className="mb-3 text-light text-capitalize">
        <label htmlFor={id}>{strings.NICKNAME}</label>
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text">@</span>
        <input
          type="text"
          className="form-control"
          id={id}
          placeholder={placeholder ? placeholder : strings.NICKNAME_PLACEHOLDER}
          value={value}
          minLength={4}
          maxLength={12}
          onChange={onChange}
          onKeyDown={_form.handleSpacePress}
          required
        />
      </div>
    </>
  );
};

export default CustomFormNickname;
