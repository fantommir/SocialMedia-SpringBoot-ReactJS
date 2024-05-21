import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSavedPostThunk } from "../../store/SavedPostSlice";
const ProfileSavedPostPart = ({ handleSavedOpen }) => {
  const allSavedPost = useSelector((store) => store.savedPost.saved);
  let uniqueSavedPosts = allSavedPost.reduce((acc, saved) => {
    acc[saved.id] = saved;
    return acc;
  }, {});
  const allSavedPostData = Object.values(uniqueSavedPosts);
  const scrollRef = useRef();
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const handleScrollInfinite = () => {
    if (
      scrollRef.current &&
      scrollRef.current.scrollTop + scrollRef.current.clientHeight + 1 >=
        scrollRef.current.scrollHeight
    ) {
      setPage((page) => page + 1);
    }
  };
  useEffect(() => {
    dispatch(getSavedPostThunk({ page }));
  }, [page]);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScrollInfinite);
    }
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScrollInfinite);
      }
    };
  }, []);
  return (
    <>
      <div className="SingleProfilePostMain" ref={scrollRef}>
        <div className="d-flex flex-wrap mx-2">
          {allSavedPostData.length > 0 &&
            allSavedPostData?.map((item, index) => (
              <div className="SingleProfilePost mx-2" key={index}>
                {item?.post?.image && (
                  <img
                    src={`data:image/jpeg;base64,${item?.post?.image}`}
                    className="MyPostsProfile"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdropSavedPostsModal"
                    onClick={(e) => handleSavedOpen(e, item)}
                  />
                )}
              </div>
            ))}
          {allSavedPostData.length == 0 && (
            <div className="m-auto my-5 noPosts">
              There is no Saved Posts...
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileSavedPostPart;
