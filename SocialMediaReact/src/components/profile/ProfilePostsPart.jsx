import React, { useEffect, useRef, useState } from "react";
import ScrollUseEffect from "../Hooks/ScrollUseEffect";
import { getUsersAllPosts } from "../api/ApiCalls";
const ProfilePostsPart = React.memo(({ handlePostOpen }) => {
  const [allData, setAllData] = useState([]);
  const ScrollRef = useRef();
  const [page, setPage] = useState(0);
  const handleScrollInfinite = () => {
    if (
      ScrollRef.current &&
      ScrollRef.current.scrollTop + ScrollRef.current.clientHeight + 1 >=
        ScrollRef.current.scrollHeight
    ) {
      setPage((page) => page + 1);
    }
  };
  useEffect(() => {
    ScrollUseEffect(ScrollRef, handleScrollInfinite);
  }, []);
  useEffect(() => {
    getUsersAllPosts({ page }).then((res) => setAllData([...allData, ...res]));
  }, [page]);
  return (
    <div className="SingleProfilePostMain" ref={ScrollRef}>
      <div className="d-flex flex-wrap mx-2">
        {allData?.map((item, index) => (
          <div className="SingleProfilePost mx-2" key={index}>
            <img
              src={`data:image/jpeg;base64,${item?.image}`}
              className="MyPostsProfile"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdropProfilePosts"
              onClick={(e) => handlePostOpen(e, item)}
            />
          </div>
        ))}
        {allData.length == 0 && (
          <div className="m-auto my-5 noPosts">There is no Posts...</div>
        )}
      </div>
    </div>
  );
});

export default ProfilePostsPart;
