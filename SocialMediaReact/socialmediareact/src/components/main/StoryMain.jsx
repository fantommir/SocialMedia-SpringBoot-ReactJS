import React, { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserStory } from "../../store/getAllUserStoriesSlice";
import { getCurrentUserStory } from "../../store/getCurrentUserStorySlice";
import StoryUpdateModal from "../modals/StoryUpdateModal";
import EditCurrentStory from "../modals/EditCurrentStory";
const AddStoryModal = lazy(() => import("../modals/AddStoryModal"));
const StoryModal = lazy(() => import("../modals/StoryModal"));
const StoryMain = () => {
  const userStoryValues = useSelector((store) => store?.UsersStories);
  const currentUserStory = useSelector(
    (store) => store.currentUserStory.currentStory
  );
  const [singleStory, setSingleStory] = useState({});
  const [singleCurrentStory, setSingleCurrentStory] = useState({});
  const dispatch = useDispatch();
  const handleStoryModalOpen = (itemStory) => {
    setSingleStory(itemStory);
  };
  const handleCurrentModalOpen = (itemStory) => {
    setSingleCurrentStory(itemStory);
  };
  useEffect(() => {
    dispatch(getAllUserStory());
  }, []);
  useEffect(() => {
    dispatch(getCurrentUserStory());
  }, []);
  return (
    <div className="row g-0">
      <StoryModal singleStory={singleStory} />
      <StoryUpdateModal singleCurrentStory={singleCurrentStory} />
      <AddStoryModal />
      <EditCurrentStory />
      <div className="StoryMain">
        <div className="col-md-2"></div>
        {!currentUserStory?.id && (
          <i
            className="bx bx-plus SinglePlusForStory"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdropStoryModal"
          />
        )}
        {currentUserStory?.image && (
          <div className="d-flex flex-column currentUserStoryMain">
            <img
              src={`data:image/jpeg;base64,${currentUserStory?.image}`}
              className="currentUserStory"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdropStoryUpdateModal"
              onClick={() => handleCurrentModalOpen(currentUserStory)}
            />
            <span className="currentUserStoryName">
              {currentUserStory?.user?.name}
            </span>
          </div>
        )}

        <div className="col-sm-6">
          {userStoryValues?.data?.length == 0 && (
            <div className="text-dark NoStory">There is No Stories...</div>
          )}
          <div className="storyPlusSymbol">
            <div className="allStoryItems">
              {userStoryValues?.data?.map((item, index) => (
                <div
                  key={index}
                  className="oneStory"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdropStory"
                  onClick={() => handleStoryModalOpen(item)}
                >
                  {
                    <img
                      src={`data:image/jpeg;base64,${item?.image}`}
                      className="singleStoryImage"
                      alt="..."
                    />
                  }
                  <span className="singleStoryName">{item?.user?.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryMain;
