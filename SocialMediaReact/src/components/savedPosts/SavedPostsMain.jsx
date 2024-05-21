import React, { useEffect, useRef, useState } from "react";
import SideBar from "../sidebar/Sidebar";
import SavedPostModal from "../modals/SavedPostModal";
import NotificationModal from "../modals/NotificationModal";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { getSavedPostPage } from "../../store/SavedPostSlice";
import ScrollUseEffect from "../Hooks/ScrollUseEffect";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SavedPostsMain = React.memo(() => {
  const savedPost = useSelector((store) => store.savedPost.savedMain);
  const uniqueSavedPost = savedPost?.reduce((acc, savedval) => {
    acc[savedval?.id] = savedval;
    return acc;
  }, {});
  const savedPostItems = Object.values(uniqueSavedPost);
  const dispatch = useDispatch();
  const [postData, setPostData] = useState();
  const ScrollRef = useRef();
  const [page, setPage] = useState(0);
  const handleSavedPostOpen = (post) => {
    setPostData(post);
  };
  const handleScrollInfinite = () => {
    if (
      ScrollRef.current &&
      ScrollRef.current.scrollTop + ScrollRef.current.clientHeight >=
        ScrollRef.current.scrollHeight
    ) {
      setPage((page) => page + 1);
    }
  };
  useEffect(() => {
    ScrollUseEffect(ScrollRef, handleScrollInfinite);
  }, []);
  useEffect(() => {
    dispatch(getSavedPostPage({ page }));
  }, [page]);
  return (
    <>
      <NotificationModal />
      <ToastContainer />
      <SavedPostModal postData={postData} />
      <div className="row g-0">
        <SideBar />
        <div className="col-sm-1 bg-dark"></div>
        <div className="col-sm-9 bg-dark SavedPostAllMain" ref={ScrollRef}>
          <div className="SavedPostAll">
            {savedPostItems.length==0&&<div className="NoSavedPosts">There are No Saved Posts Left...</div>}
            {savedPostItems &&
              savedPostItems?.map((item, index) => (
                <div className="SavedPostBox" key={index}>
                  {item?.post?.image != undefined && (
                    <img
                      src={`data:image/jpeg;base64,${item?.post?.image}`}
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdropSavedPost"
                      onClick={() => handleSavedPostOpen(item?.post)}
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
});

export default SavedPostsMain;
