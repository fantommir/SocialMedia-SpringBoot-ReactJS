import React, { lazy, useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import NotificationModal from "../modals/NotificationModal";
import { ProfilePostModal } from "../modals/ProfilePostModal";
import ProfileTopPart from "./ProfileTopPart";
import ProfileMiddlePart from "./ProfileMiddlePart";
import ProfilePostsPart from "./ProfilePostsPart";
import ProfileSavedPostPart from "./ProfileSavedPostPart";
import ProfileSavedPostModal from "../modals/ProfileSavedPostModal";
import EditProfileModal from "../modals/EditProfileModal";
import "../../App.css";
import { useDispatch } from "react-redux";
import { getAllSavedPosts } from "../../store/SavedPostSlice";
const ProfileMain = React.memo(() => {
  const dispatch = useDispatch();
  const [imgObj, setImageObj] = useState({});
  const [savedObj, setSavedObj] = useState({});
  const [toggleNavs, setToggleNavs] = useState({});
  const handlePostOpen = (e, item) => {
    setImageObj(item);
  };
  const handleSavedOpen = (e, item) => {
    setSavedObj(item);
  };
  useEffect(() => {
    dispatch(getAllSavedPosts());
  }, []);
  return (
    <>
      <ProfilePostModal imgObj={imgObj} />
      <NotificationModal />
      <ProfileSavedPostModal savedObj={savedObj} />
      <div className="ProfileMain row g-0">
        <Sidebar />
        <div className="col-sm-1 bg-primary"></div>
        <div className="col-sm-8 bg-dark">
          <div className="ProfilePageMain">
            <div className="AllProfilePageItems">
              <ProfileTopPart />
              <div className="ProfileDescription text-white">
                <div className="d-flex flex-column">
                  <ProfileMiddlePart />
                  <div className="d-flex ">
                    <p
                      className="ProfilePostHeading"
                      onClick={() =>
                        setToggleNavs({
                          posts: true,
                          saved: false,
                        })
                      }
                    >
                      Post
                    </p>
                    <p
                      className="ProfilePostHeading"
                      onClick={() =>
                        setToggleNavs({
                          posts: false,
                          saved: true,
                        })
                      }
                    >
                      Saved
                    </p>
                  </div>
                </div>
                <hr />
                {toggleNavs.posts && (
                  <ProfilePostsPart handlePostOpen={handlePostOpen} />
                )}
                {toggleNavs.saved && (
                  <ProfileSavedPostPart handleSavedOpen={handleSavedOpen} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-1 bg-primary"></div>
      </div>
    </>
  );
});

export default ProfileMain;
