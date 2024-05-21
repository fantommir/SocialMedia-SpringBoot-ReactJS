import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postUploadData } from "../../store/postUploadSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Debounce from "../Hooks/Debounce";
const data = { desc: "", image: "" };
const AddPostModal = React.memo(() => {
  const dispatch = useDispatch();
  const [postFormData, setPostFormData] = useState(data);
  const handlePostInput = (e) => {
    setPostFormData({
      ...postFormData,
      desc: e.target.value,
    });
  };
  const handlePostImage = (e) => {
    e.target.files[0];
    setPostFormData({
      ...postFormData,
      image: e.target.files[0],
    });
  };
  const handleDebounceInput = Debounce(handlePostInput, 300);
  const handleOnSubmitPost = (e) => {
    e.preventDefault();
    const formValues = new FormData();
    formValues.append("desc", postFormData.desc);
    formValues.append("image", postFormData.image);
    dispatch(postUploadData(formValues));
  };
  return (
    <>
      <ToastContainer />
      <div
        className="modal fade"
        id="staticBackdropAddPost"
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
                  Add Post
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
            <div className="modal-body">
              <form onSubmit={handleOnSubmitPost}>
                <input
                  type="text"
                  className="form-control w-75 m-auto"
                  placeholder="Post Description"
                  // value={postFormData.desc}
                  onChange={(e) => handleDebounceInput(e)}
                />
                <input
                  type="file"
                  className="form-control w-75 m-auto mt-3"
                  // value={postFormData.media}
                  onChange={(e) => handlePostImage(e)}
                />
                <div className="modal-footer">
                  <button className="btn btn-primary mx-2">Post Image</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
export default AddPostModal;
