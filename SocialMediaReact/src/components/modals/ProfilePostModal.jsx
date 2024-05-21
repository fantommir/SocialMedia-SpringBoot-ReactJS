import PostSendModal from "./PostSendModal";
import { useEffect, useState } from "react";
import CommentModel from "./CommentModel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostThunk,
  getAllSavedPosts,
  savePostThunk,
} from "../../store/SavedPostSlice";
import { likePostData } from "../../store/postUploadSlice";
import { postValuesSliceActions } from "../../store/postValues";
export const ProfilePostModal = ({ imgObj }) => {
  const tokenUserId = useSelector((store) => store.tokenUser.data);
  const allSavedPosts = useSelector((store) => store.savedPost.data);
  const currentSavedValues = allSavedPosts?.find(
    (item) => item?.post?.id == imgObj?.id
  );
  const currentUserAllPosts = useSelector((store) =>
    store?.postUpload?.data?.find((item) => item?.id == imgObj?.id)
  );
  let val = allSavedPosts?.map(
    (item) => item.post.id == currentSavedValues?.post?.id
  );
  const dispatch = useDispatch();
  const [postValues, setPostValues] = useState();
  const handlePostValues = (imgObj) => {
    setPostValues(imgObj);
    dispatch(postValuesSliceActions.updatePostValue(imgObj));
  };
  const handleSavedPost = (item) => {
    let savePostData = new FormData();
    savePostData.append("postId", item?.id);
    dispatch(savePostThunk(savePostData));
  };
  const handleDeletePost = (item) => {
    dispatch(deletePostThunk({ postId: item?.id }));
  };
  const handleOnLike = (item) => {
    let likedPostId = new FormData();
    likedPostId.append("postId", item?.id);
    dispatch(likePostData(likedPostId));
  };
  useEffect(() => {
    dispatch(getAllSavedPosts());
  }, []);
  return (
    <>
      <PostSendModal postValues={postValues?.id} />
      <ToastContainer />
      <CommentModel postValues={postValues?.id} />
      <div
        className="modal fade"
        id="staticBackdropProfilePosts"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="col-sm-3">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  {currentUserAllPosts?.user?.name}
                </h1>
              </div>
              <div className="col-sm-8"></div>
              <div className="col-sm-1">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
            </div>
            <div className="modal-body m-auto">
              {currentUserAllPosts?.image != undefined && (
                <img
                  src={`data:image/jpeg;base64,${currentUserAllPosts?.image}`}
                  className="PostModalImage mx-4"
                />
              )}
              <br />
              <div className="LikesCount">
                <span>
                  {currentUserAllPosts?.id &&
                    currentUserAllPosts?.likes[
                      currentUserAllPosts?.likes?.length - 1
                    ]?.name && (
                      <b>
                        {
                          currentUserAllPosts?.likes[
                            currentUserAllPosts?.likes?.length - 1
                          ]?.name
                        }
                        &nbsp;
                      </b>
                    )}
                </span>
                <span className="small">
                  {currentUserAllPosts?.id &&
                    currentUserAllPosts?.likes[0]?.name &&
                    currentUserAllPosts?.likes?.length - 1 != 0 && (
                      <span>
                        and {currentUserAllPosts?.likes?.length - 1} Other liked
                        This Post...
                      </span>
                    )}
                  {currentUserAllPosts?.id &&
                    currentUserAllPosts?.likes[0]?.name &&
                    currentUserAllPosts?.likes?.length - 1 == 0 && (
                      <span> liked This Post...</span>
                    )}
                </span>
              </div>
              <div className="AllPostModalDesc">
                {currentUserAllPosts?.likes?.some(
                  (likeUser) => likeUser?.id === tokenUserId?.id
                ) ? (
                  <span
                    className="HeartSymbolPost"
                    onClick={() => handleOnLike(currentUserAllPosts)}
                  >
                    <span className="savedPostHeart">
                      <i className="fa-solid fa-heart redHeart"></i>
                    </span>
                  </span>
                ) : (
                  <span
                    className="HeartSymbolPost"
                    onClick={() => handleOnLike(currentUserAllPosts)}
                  >
                    <i className="fa-regular fa-heart savedPostHeart"></i>
                  </span>
                )}
                <i
                  className="fa-regular fa-message PostModalImageChat"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdropComment"
                  onClick={() => handlePostValues(imgObj)}
                />
                <i
                  className="bx bx-send PostModalImageSend"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdropPostSend"
                  onClick={() => handlePostValues(imgObj)}
                />
                {val &&
                  val?.length > 0 &&
                  val?.map((_, index) => (
                    <div key={index} className="savedIconProfile">
                      {val.some((savedPost) => savedPost === true) ? (
                        <i
                          className="fa-solid fa-bookmark SavePostBtn mt-2"
                          data-bs-dismiss="modal"
                          onClick={() => handleDeletePost(currentUserAllPosts)}
                        />
                      ) : (
                        <i
                          className="fa-regular fa-bookmark SavePostBtn mt-2"
                          data-bs-dismiss="modal"
                          onClick={() => handleSavedPost(currentUserAllPosts)}
                        />
                      )}
                    </div>
                  ))}
                {val?.length == 0 && (
                  <i
                    className="fa-regular fa-bookmark SavePostBtn mt-2"
                    data-bs-dismiss="modal"
                    onClick={() => handleSavedPost(currentUserAllPosts)}
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
