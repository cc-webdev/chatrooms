import React from "react";
import ButtonCircleDropdown from "../../../components/ButtonCircleDropdown";
import useUser from "../../../hooks/userHook";
import { setDelete } from "../../../reducers/deleteSlice";
import { useAppDispatch, useAppSelector } from "../../../store";
import { icons, strings } from "../../../utils/constants";

const Menu: React.FC = () => {
  const _dispatch = useAppDispatch();
  const _user = useUser();
  const _userData = useAppSelector((state) => state.user);

  return (
    <div
      className="d-flex align-content-center 
  align-items-center;"
    >
      <div className="d-flex align-items-center">
        <h6 className="m-0 p-0 text-light">{_userData.nickname}</h6>
      </div>
      <ButtonCircleDropdown id="dropdownMenu" icon={icons.PERSON_CIRCLE}>
        <ul
          className="dropdown-menu dropdown-menu-dark dropdown-menu-end mt-3"
          aria-labelledby="dropdownMenu"
        >
          <li>
            <button
              type="button"
              className="dropdown-item text-uppercase"
              aria-controls="modal"
              data-bs-toggle="modal"
              data-bs-target="#modalUser"
              onClick={() => _dispatch(setDelete(false))}
            >
              <div className="d-flex align-items-center">
                <span className="me-3 p-2">{icons.GEAR_FILL}</span>
                <span className="me-3 p-2">{strings.SETTINGS}</span>
              </div>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="dropdown-item text-uppercase"
              onClick={() => _user.signOutUser(_userData.id)}
            >
              <div className="d-flex align-items-center">
                <span className="me-3 p-2">{icons.BOX_ARROW_RIGHT}</span>
                <span className="me-3 p-2">{strings.SIGN_OUT}</span>
              </div>
            </button>
          </li>
        </ul>
      </ButtonCircleDropdown>
    </div>
  );
};

export default Menu;
