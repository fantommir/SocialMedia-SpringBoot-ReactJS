import React from "react";
import ProfilePicUpdate from "../modals/ProfilePicUpdate";
import ProfileBackgroundPicUpdate from "../modals/ProfileBackgroundPicUpdate";
import { useSelector } from "react-redux";
import EditProfileModal from "../modals/EditProfileModal";
const ProfileTopPart = React.memo(() => {
  const tokenUser = useSelector((store) => store.tokenUser.data);
  return (
    <>
      <ProfilePicUpdate />
      <ProfileBackgroundPicUpdate />
      <EditProfileModal />
      <div className="ProfilePageTopSec">
        {tokenUser && tokenUser?.background ? (
          <img
            src={`data:image/jpeg;base64,${tokenUser?.background}`}
            className="ProfilePageBackgroundImage"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdropProfileBackgroundPic"
          />
        ) : (
          <div
            className="ProfilePageBackgroundImage"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdropProfileBackgroundPic"
          ></div>
        )}
      </div>
      <div className="ProfilePageTopSecDp">
        {tokenUser?.profile && (
          <img
            src={`data:image/jpeg;base64,${tokenUser?.profile}`}
            className="ProfilePicDp"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdropProfilePic"
          />
        )}
      </div>
      <div className="text-white position-relative">
        <button
          className="btn btn-success EditProfileBtn position-absolute"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdropEditProfile"
        >
          Edit Profile
        </button>
      </div>
    </>
  );
});

export default ProfileTopPart;
