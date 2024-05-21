import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, tokenUserPostCount } from "../../store/TokenUserSlice";

const ProfileMiddlePart = React.memo(() => {
  const tokenUser = useSelector((store) => store.tokenUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(tokenUserPostCount());
  }, []);
  return (
    <>
      <span className="ProfileNameHeading">{tokenUser?.data?.name}</span>
      <span className="descriptionName">@{tokenUser?.data?.name}</span>
      <div className="SocialFollows">
        <span className="postCount mx-3">{tokenUser?.posts} Post</span>
        <span className="FollowCount mx-3">
          {tokenUser?.data?.followers?.length} Followers
        </span>
        <span className="FollowingCount mx-3">
          {tokenUser?.data?.followings?.length} Following
        </span>
      </div>
      <div className="ProfilePostDescription small">
        {tokenUser?.data?.description}
      </div>
    </>
  );
});

export default ProfileMiddlePart;
