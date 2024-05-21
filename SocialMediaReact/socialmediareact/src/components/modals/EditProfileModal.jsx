import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { tokenUserEditProfile } from "../../store/TokenUserSlice";

const EditProfileModal = React.memo(() => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
  });
  const handleOnEditProfile = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  const handleEditProfile = () => {
    let editData = new FormData();
    editData.append("name", inputs.name);
    editData.append("description", inputs.description);
    dispatch(tokenUserEditProfile(editData));
  };
  return (
    <div
      className="modal fade"
      id="staticBackdropEditProfile"
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
              Edit Profile
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="EditProfileInputs w-75 m-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Change your Name"
                name="name"
                // value={inputs.name}
                onChange={handleOnEditProfile}
              />
              <input
                type="text"
                className="form-control mt-3"
                placeholder="Change Bio"
                name="description"
                // value={inputs.description}
                onChange={handleOnEditProfile}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button className="btn btn-primary" onClick={handleEditProfile}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default EditProfileModal;
