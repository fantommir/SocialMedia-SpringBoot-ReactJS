import React, {  useState } from "react";
import { useDispatch } from "react-redux";
import { tokenUserProfileUpdate } from "../../store/TokenUserSlice";

const ProfilePicUpdate = React.memo(() => {
  const dispatch = useDispatch();
  const [fileChange, setFileChange] = useState();
  const handleOnChangeProfile = (e) => {
    setFileChange(e.target.files[0]);
  };
  const handleOnSubmitProfile = (e) => {
    e.preventDefault();
    let fileData = new FormData();
    fileData.append("profile", fileChange);
    dispatch(tokenUserProfileUpdate(fileData));
  };
  return (
    <div
      className="modal fade"
      id="staticBackdropProfilePic"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              ProfilePic Update
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={(e) => handleOnSubmitProfile(e)}>
              <div className="ProfilePicFile mx-5">
                <input
                  type="file"
                  className="form-control w-100"
                  onChange={(e) => handleOnChangeProfile(e)}
                />
              </div>
              <div className="row g-0 mb-2 mt-3">
                <div className="col-sm-6"></div>
                <div className="col-sm-1 mx-2">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
                <div className="col-sm-1 mx-4">
                  <button className="btn btn-primary">UpdateProfile</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProfilePicUpdate;
