import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../store/TokenUserSlice";

const RightbarHeader = React.memo(() => {
  const user = useSelector((store) => store.tokenUser.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);
  return (
    <>
      <div className="rightBarHeading">
        {user && (
          <img
            src={`data:image/jpeg;base64,${user?.profile}`}
            className="rightbarImage"
          />
        )}
        <span className="rightProfileName">{user?.name}</span>
      </div>
      <hr />
    </>
  );
});

export default RightbarHeader;
