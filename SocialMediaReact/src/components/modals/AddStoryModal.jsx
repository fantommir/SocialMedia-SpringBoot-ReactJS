import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postUserStory } from "../../store/getCurrentUserStorySlice";
import Debounce from "../Hooks/Debounce";

const AddStoryModal = React.memo(() => {
  const dispatch = useDispatch();
  const [story, setStory] = useState({
    description: "",
    image: "",
  });
  const handleStoryInputChange = (e) => {
    setStory({ ...story, description: e.target.value });
  };
  const handleChangeStoryFile = (e) => {
    setStory({ ...story, image: e.target.files[0] });
  };
  const handleDebounceStoryInput = Debounce(handleStoryInputChange, 300);
  const handleStorySubmit = (e) => {
    e.preventDefault();
    let storyData = new FormData();
    storyData.append("description", story.description);
    storyData.append("storyImage", story.image);
    dispatch(postUserStory(storyData));
  };
  return (
    <div
      className="modal fade"
      id="staticBackdropStoryModal"
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
                Add Story
              </h1>
            </div>
            <div className="col-sm-6"></div>
            <div className="saveAndClose">
              <button
                type="button"
                className="btn btn-warning mx-2"
                data-bs-dismiss="modal"
              >
                ❌
              </button>
            </div>
          </div>
          <form action="" onSubmit={handleStorySubmit}>
            <div className="modal-body">
              <input
                type="text"
                className="form-control w-75 m-auto"
                placeholder="Story Description"
                onChange={(e) => handleDebounceStoryInput(e)}
              />
              <input
                type="file"
                className="form-control w-75 m-auto mt-3"
                onChange={(e) => handleChangeStoryFile(e)}
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

export default AddStoryModal;
