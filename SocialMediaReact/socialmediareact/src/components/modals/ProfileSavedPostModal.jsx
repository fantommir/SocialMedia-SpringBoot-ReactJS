import React, { useEffect, useState } from "react";
import CommentModel from "./CommentModel";
import PostSendModal from "./PostSendModal";
import { useDispatch, useSelector } from "react-redux";
import {
  SavedLikePostData,
  deletePostThunk,
  getAllSavedPosts,
  savePostThunk,
} from "../../store/SavedPostSlice";
import { postValuesSliceActions } from "../../store/postValues";
// import { getAllSavedPosts } from "../api/ApiCalls";

const ProfileSavedPostModal = ({ savedObj }) => {
  const tokenUserId = useSelector((store) => store?.tokenUser?.data);
  // const [allSavedValues, setAllSavedValues] = useState([]);
  const allSavedValues = useSelector((store) => store.savedPost.data);
  const currentSavedValues = allSavedValues?.find(
    (item) => item?.post?.id == savedObj?.post?.id
  );
  const dispatch = useDispatch();
  const [postValues, setPostValues] = useState();
  const handlePostValues = (imgObj) => {
    dispatch(postValuesSliceActions.updatePostValue(imgObj?.post));
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
  useEffect(() => {
    dispatch(getAllSavedPosts());
    // getAllSavedPosts().then((res) => setsavedPostItems(res));
  }, []);
  return (
    <>
      <PostSendModal postValues={postValues?.post?.id} />
      <CommentModel postValues={postValues?.post?.id} />
      <div
        className="modal fade"
        id="staticBackdropSavedPostsModal"
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
                PostDesc
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body m-auto">
              {currentSavedValues && currentSavedValues?.post?.image && (
                <img
                  src={`data:image/jpeg;base64,${currentSavedValues?.post?.image}`}
                  className="PostModalImage mx-4"
                />
              )}
              <br />
              <div className="LikesCount">
                <span>
                  {currentSavedValues?.post?.likes[
                    currentSavedValues?.post?.likes?.length - 1
                  ]?.name && (
                    <b>
                      {
                        currentSavedValues?.post?.likes[
                          currentSavedValues?.post?.likes?.length - 1
                        ]?.name
                      }
                    </b>
                  )}
                </span>
                <span className="small">
                  {currentSavedValues?.post?.likes[0]?.name &&
                    currentSavedValues?.post?.likes?.length - 1 != 0 && (
                      <span>
                        &nbsp;and {currentSavedValues?.post?.likes?.length - 1}{" "}
                        Other liked This Post...
                      </span>
                    )}
                  {currentSavedValues?.post?.likes[0]?.name &&
                    currentSavedValues?.post?.likes?.length - 1 == 0 && (
                      <span> liked This Post...</span>
                    )}
                </span>
              </div>
              <div className="AllPostModalDesc">
                {currentSavedValues?.post?.likes?.some(
                  (likeUser) => likeUser?.id === tokenUserId?.id
                ) ? (
                  <span
                    className="HeartSymbolPost"
                    onClick={() => handleOnLike(currentSavedValues?.post)}
                  >
                    <span className="savedPostHeart">
                      <i className="fa-solid fa-heart redHeart"></i>
                    </span>
                  </span>
                ) : (
                  <span
                    className="HeartSymbolPost"
                    onClick={() => handleOnLike(currentSavedValues?.post)}
                  >
                    <i className="fa-regular fa-heart savedPostHeart"></i>
                  </span>
                )}
                <i
                  className="fa-regular fa-message PostModalImageChat"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdropComment"
                  onClick={() => handlePostValues(savedObj)}
                />
                <i
                  className="bx bx-send PostModalImageSend"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdropPostSend"
                  onClick={() => handlePostValues(savedObj)}
                />
                {!currentSavedValues ? (
                  <i
                    className="fa-regular fa-bookmark SavePostBtnn mt-2"
                    onClick={() => handleSavedPost(currentSavedValues?.post)}
                  />
                ) : (
                  <i
                    className="fa-solid fa-bookmark SavePostBtnn mt-2"
                    data-bs-dismiss="modal"
                    onClick={() => handleDeletePost(currentSavedValues?.post)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSavedPostModal;
