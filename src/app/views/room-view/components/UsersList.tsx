import React from "react";
import { useAppSelector } from "../../../store";
import { icons } from "../../../utils/constants";

const UsersList: React.FC = () => {
  const _roomData = useAppSelector((state) => state.room);

  return (
    <div className="overflow-auto ps-3 pe-3" style={{ maxHeight: "70vh" }}>
      <table className="table table-dark table-striped">
        <tbody>
          {_roomData.users.map((user) => {
            return (
              <tr key={user}>
                <td className="w-100">
                  {user === _roomData.admin ? (
                    <span className="d-flex">
                      <span
                        className="me-1 d-block"
                        style={{ minWidth: "16px" }}
                      >
                        {icons.PERSON_FILL}
                      </span>
                      <span>{user}</span>
                    </span>
                  ) : (
                    <span className="d-flex">
                      <span
                        className="me-1 d-block"
                        style={{ minWidth: "16px" }}
                      ></span>
                      <span>{user}</span>
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
