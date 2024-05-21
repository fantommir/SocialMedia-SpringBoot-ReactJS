import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments, sendComment } from "../../store/PostCommentSlice";
import Debounce from "../Hooks/Debounce";
import ScrollUseEffect from "../Hooks/ScrollUseEffect";
const CommentModel = React.memo(({ postValues }) => {
  const myValues = useSelector((store) => store.postValue.data);
  const [page, setPage] = useState(0);
  const allCom = useSelector((store) => store.postComment.data);
  const uniqueAllComments = allCom.reduce((acc, com) => {
    acc[com?.id] = com;
    return acc;
  }, {});
  const allComments = Object.values(uniqueAllComments);
  const dispatch = useDispatch();
  const commentScrollRef = useRef();
  const [commentChange, setCommentChange] = useState("");
  const handleCommentChange = async (e) => {
    setCommentChange(e.target.value);
    if (e.key == "Enter") {
      await dispatch(sendComment({ commentData: commentChange }));
      commentScrollRef.current.scrollTop =
        commentScrollRef.current.scrollHeight;
      e.target.value = "";
      setCommentChange(e.target.value);
    }
  };
  const handleDebounceCommentChange = Debounce(handleCommentChange, 300);
  const handleScrollInfinite = () => {
    if (
      commentScrollRef.current &&
      commentScrollRef.current.scrollTop +
        commentScrollRef.current.clientHeight +
        1 >=
        commentScrollRef.current.scrollHeight
    ) {
      setPage(page + 1);
    }
  };
  const handleSubmitComment = async () => {
    await dispatch(sendComment({ commentData: commentChange }));
    commentScrollRef.current.scrollTop = commentScrollRef.current.scrollHeight;
  };
  useEffect(() => {
    ScrollUseEffect(commentScrollRef, handleScrollInfinite);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      if (myValues?.id != undefined) {
        await dispatch(getComments({ postId: myValues?.id, page: page }));
        // setPage(0);
      }
    };

    fetchData();

    return () => {
      // setPage(0);
    };
  }, [page, myValues]);

  return (
    <div
      className="modal fade"
      id="staticBackdropComment"
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
              Comment Here
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="AllCommentsModal" ref={commentScrollRef}>
              {allComments?.length > 0 &&
                allComments?.map((item, index) => (
                  <div className="singleComment" key={index}>
                    <div className="col-sm-1">
                      <div className="commentImg">
                        {item?.user?.profile && (
                          <img
                            src={`data:image/jpeg;base64,${item?.user?.profile}`}
                            className="singleCommentImage"
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-sm-10">
                      <div className="commentText">
                        <span className="small">
                          <b>{item?.user?.name} </b>
                          {item?.text}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-1">
                      <i className="bx bx-dots-horizontal-rounded commentMoreSymbol" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <hr />
          <div className="">
            <div className="d-flex">
              <input
                type="text"
                className="form-control w-75 mx-5 mb-3"
                placeholder="Comment here..."
                onChange={(e) => handleDebounceCommentChange(e)}
                onKeyDown={(e) => handleDebounceCommentChange(e)}
              />
              <i
                className="bx bx-send sendBtnCommentModal"
                onClick={() => handleSubmitComment()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CommentModel;
