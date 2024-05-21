import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SavedLikePostData,
  deletePostThunk,
  savePostThunk,
} from "../../store/SavedPostSlice";
import CommentModel from "./CommentModel";
import PostSendModal from "./PostSendModal";
import { postValuesSliceActions } from "../../store/postValues";
const SavedPostModal = React.memo(({ postData }) => {
  const tokenUserId = useSelector((store) => store?.tokenUser?.data);
  const currentPostValues = useSelector((store) =>
    store.savedPost.data.find((item) => item?.post?.id == postData?.id)
  );
  const dispatch = useDispatch();
  const [postValues, setPostValues] = useState();
  const handlePostValues = (imgObj) => {
    dispatch(postValuesSliceActions.updatePostValue(imgObj));
    setPostValues(imgObj);
  };
  const handleSavedPost = (item) => {
    let savePostData = new FormData();
    savePostData.append("postId", item.id);
    dispatch(savePostThunk(savePostData));
  };
  const handleDeletePost = (item) => {
    dispatch(deletePostThunk({ postId: item?.id }));
  };
  const handleOnLike = (item) => {
    let likedPostId = new FormData();
    likedPostId.append("postId", item?.id);
    dispatch(SavedLikePostData(likedPostId));
  };
  return (
    <>
      <PostSendModal postValues={postValues?.id} />
      <CommentModel postValues={postValues?.id} />
      <div
        className="modal fade"
        id="staticBackdropSavedPost"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {postData?.user?.name}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {postData && (
                <img
                  src={`data:image/jpeg;base64,${postData?.image}`}
                  className="SavedPostModalImage mx-4 mb-4"
                />
              )}
              <br />
              <div className="LikesCountSaved">
                <span>
                  {currentPostValues?.post?.likes[
                    currentPostValues?.post?.likes?.length - 1
                  ]?.name && (
                    <b>
                      {
                        currentPostValues?.post?.likes[
                          currentPostValues?.post?.likes?.length - 1
                        ]?.name
                      }
                    </b>
                  )}
                </span>
                <span className="small">
                  {currentPostValues?.post?.likes[0]?.name &&
                    currentPostValues?.post?.likes?.length - 1 != 0 && (
                      <span>
                        &nbsp;and {currentPostValues?.post?.likes?.length - 1}{" "}
                        Other liked This Post...
                      </span>
                    )}
                  {currentPostValues?.post?.likes[0]?.name &&
                    currentPostValues?.post?.likes?.length - 1 == 0 && (
                      <span> liked This Post...</span>
                    )}
                </span>
              </div>
              <div className="AllPostModalDesc">
                {currentPostValues?.post?.likes?.some(
                  (likeUser) => likeUser?.id === tokenUserId?.id
                ) ? (
                  <span
                    className="HeartSymbolPost"
                    onClick={() => handleOnLike(currentPostValues?.post)}
                  >
                    <span className="savedPostHeart">
                      <i className="fa-solid fa-heart redHeart"></i>
                    </span>
                  </span>
                ) : (
                  <span
                    className="HeartSymbolPost"
                    onClick={() => handleOnLike(currentPostValues?.post)}
                  >
                    <i className="fa-regular fa-heart savedPostHeart"></i>
                  </span>
                )}
                <i
                  className="fa-regular fa-message PostModalImageChat"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdropComment"
                  onClick={() => handlePostValues(postData)}
                />
                <i
                  className="bx bx-send PostModalImageSend"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdropPostSend"
                  onClick={() => handlePostValues(postData)}
                />
                {!currentPostValues ? (
                  <i
                    className="fa-regular fa-bookmark SavePostBtnMain mt-2"
                    onClick={() => handleSavedPost(currentPostValues?.post)}
                  />
                ) : (
                  <i
                    className="fa-solid fa-bookmark SavePostBtnMain mt-2"
                    data-bs-dismiss="modal"
                    onClick={() => handleDeletePost(currentPostValues?.post)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default SavedPostModal;
