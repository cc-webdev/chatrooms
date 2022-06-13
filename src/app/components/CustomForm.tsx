import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const CustomForm: React.FC<Props> = ({ children, title, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="m-auto">
      {title ? (
        <div className="mb-5">
          <h1 className="text-center text-light">{title}</h1>
        </div>
      ) : null}
      {children}
    </form>
  );
};

export default CustomForm;
