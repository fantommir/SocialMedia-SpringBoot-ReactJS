import React, { lazy, useEffect, useRef, useState } from "react";
import PostSendModal from "../modals/PostSendModal";
import { useDispatch, useSelector } from "react-redux";
import PostInputs from "./PostInputs";
import { allPostFetch, likePostData } from "../../store/postUploadSlice";
import {
  deletePostThunk,
  getAllSavedPosts,
  savePostThunk,
} from "../../store/SavedPostSlice";
import ScrollUseEffect from "../Hooks/ScrollUseEffect";
import { postValuesSliceActions } from "../../store/postValues";
const CommentModel = lazy(() => import("../modals/CommentModel"));
const PostMain = React.memo(() => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const userScrollRef = useRef();
  const tokenUserId = useSelector((store) => store.tokenUser.data);
  const allPostValues = useSelector((store) => store.postUpload.allPosts);
  const uniqueAllposts = allPostValues.reduce((acc, postVal) => {
    acc[postVal?.id] = postVal;
    return acc;
  }, {});
  const allPostsData = Object.values(uniqueAllposts);
  const allSavedPosts = useSelector((store) => store.savedPost.saved);
  const [postValues, setPostValues] = useState();
  const handlePostValues = (item) => {
    setPostValues(item);
    dispatch(postValuesSliceActions.updatePostValue(item));
  };
  const handleOnLike = (item) => {
    let likedPostId = new FormData();
    likedPostId.append("postId", item.id);
    dispatch(likePostData(likedPostId));
  };
  const handleInfiniteScroll = () => {
    if (
      userScrollRef.current &&
      userScrollRef.current.scrollTop +
        userScrollRef.current.clientHeight +
        1 >=
        userScrollRef.current.scrollHeight
    ) {
      setPage((page) => page + 1);
    }
  };
  const handleSavedPost = (item) => {
    let savePostData = new FormData();
    savePostData.append("postId", item.id);
    dispatch(savePostThunk(savePostData));
  };
  const handledeletePost = (item) => {
    dispatch(deletePostThunk({ postId: item?.id }));
  };
  useEffect(() => {
    dispatch(allPostFetch(page));
  }, [page]);
  useEffect(() => {
    ScrollUseEffect(userScrollRef, handleInfiniteScroll);
  }, []);
  useEffect(() => {
    dispatch(getAllSavedPosts());
  }, []);
  return (
    <div className="row g-0 colorForPosts">
      <div className="PostsMain" ref={userScrollRef}>
        <PostInputs />
        <CommentModel postValues={postValues?.id} />
        <div className="displayAllPosts ">
          {allPostsData?.length == 0 && (
            <div className="NoPostsMain">There is No Posts....</div>
          )}
          {allPostsData?.map((item, index) => (
            <div className="w-75 m-auto" key={index}>
              <div className="m-auto mt-2 SinglePostMain w-75">
                <div className="postHeading">
                  <img
                    src={`data:image/jpeg;base64,${item?.user?.profile}`}
                    alt="profilepic"
                    className="postProfilePic"
                  />

                  <div className="postNameandDesc">
                    <span className="postName">{item?.user?.name}</span>
                    <span className="postNameAt">@{item?.user?.name}</span>
                  </div>
                </div>
                <img
                  src={`data:image/jpeg;base64,${item?.image}`}
                  className="SinglePostImage py-2"
                  onClick={() => handleOnLike(item)}
                />
                <div className="LikesCount">
                  <span>
                    {item?.likes.some(
                      (user) => user?.id === tokenUserId?.id
                    ) ? (
                      <b>{tokenUserId?.name} </b>
                    ) : (
                      item?.likes.length > 0 && (
                        <b>{item.likes[item.likes.length - 1]?.name} </b>
                      )
                    )}
                  </span>
                  <span className="small">
                    {item?.likes[0]?.name && item?.likes?.length - 1 != 0 && (
                      <span>
                        and {item?.likes?.length - 1} Other liked This Post...
                      </span>
                    )}
                    {item?.likes[0]?.name && item?.likes?.length - 1 == 0 && (
                      <span> liked This Post...</span>
                    )}
                  </span>
                </div>
                <div className="CommentIconsSec">
                  <PostSendModal postValues={postValues?.id} />
                  <div className="postname">
                    {item?.likes?.some(
                      (likeUser) => likeUser?.id === tokenUserId?.id
                    ) ? (
                      <span
                        className="HeartSymbolPost"
                        onClick={() => handleOnLike(item)}
                      >
                        <i className="fa-solid fa-heart redHeart"></i>
                      </span>
                    ) : (
                      <span
                        className="HeartSymbolPost"
                        onClick={() => handleOnLike(item)}
                      >
                        <i className="fa-regular fa-heart postHeart"></i>
                      </span>
                    )}
                    <i
                      className="fa-regular fa-message ChatPostBtn"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdropComment"
                      onClick={() => handlePostValues(item)}
                    />
                    <i
                      className="SendPostBtn bx bx-send"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdropPostSend"
                      onClick={() => handlePostValues(item)}
                    />
                  </div>
                  {allSavedPosts?.length > 0 &&
                    allSavedPosts?.map((savedPost, index) => (
                      <div key={index} className="savedIcon">
                        {savedPost?.post?.id == item?.id ? (
                          <i
                            className="fa-solid fa-bookmark SavePostBtn mt-2"
                            onClick={() => handledeletePost(item)}
                          />
                        ) : (
                          <i
                            className="fa-regular fa-bookmark SavePostBtn mt-2"
                            onClick={() => handleSavedPost(item)}
                          />
                        )}
                      </div>
                    ))}
                  {allSavedPosts?.length == 0 && (
                    <i
                      className="fa-regular fa-bookmark SavePostBtn mt-2"
                      onClick={() => handleSavedPost(item)}
                    />
                  )}
                </div>
                <div className="DescriptionSec mt-2">
                  <b>{item?.user?.name} </b>
                  {item?.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default PostMain;
