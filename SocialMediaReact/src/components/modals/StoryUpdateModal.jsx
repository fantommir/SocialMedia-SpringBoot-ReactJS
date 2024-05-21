import React from "react";
import { useDispatch } from "react-redux";
import { deleteStoryCurrent } from "../../store/getCurrentUserStorySlice";

const StoryUpdateModal = React.memo(({ singleCurrentStory }) => {
  const dispatch = useDispatch();
  const handleDeletePost = (e) => {
    dispatch(deleteStoryCurrent());
    setTogglePlus(!togglePlus);
  };
  return (
    <div
      className="modal fade"
      id="staticBackdropStoryUpdateModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <div className="col-sm-4">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                {singleCurrentStory?.user?.name}
              </h1>
            </div>
            <div className="col-sm-4"></div>
            <button
              className="btn btn-danger deleteBtn "
              data-bs-dismiss="modal"
              onClick={(e) => handleDeletePost(e)}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
            <button
              className="btn btn-primary mx-2"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdropStoryEditModal"
            >
              Edit
            </button>
            <button
              type="button"
              className="btn-close marginCross"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {singleCurrentStory?.image && (
              <img
                src={`data:image/jpeg;base64,${singleCurrentStory?.image}`}
                className="SavedPostModalImage mx-4 mb-4"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default StoryUpdateModal;
