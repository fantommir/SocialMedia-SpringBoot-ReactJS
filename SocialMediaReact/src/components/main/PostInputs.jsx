import React from "react";
import AddPostModal from "../modals/AddPostModal";
const PostInputs = React.memo(() => {
  return (
    <>
      <AddPostModal />
      <div className="PostInputBox w-75 mt-2">
        <input
          type="text"
          className="form-control w-75 m-auto "
          placeholder="Add Post Image Here"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdropAddPost"
        />
      </div>
    </>
  );
});

export default PostInputs;
