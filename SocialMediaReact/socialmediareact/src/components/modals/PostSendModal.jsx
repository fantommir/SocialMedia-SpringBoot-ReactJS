import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFollowersObjects } from "../../store/followersSlice";
import ScrollUseEffect from "../Hooks/ScrollUseEffect";
import Debounce from "../Hooks/Debounce";
import {
  getPostByIdThunk,
  // sendMessageToMultipleUsers,
} from "../../store/getPostByIdSlice";
import { sendMessageToMultipleUsers } from "../../store/MessageSlice";
const PostSendModal = React.memo(({ postValues }) => {
  const postById = useSelector((store) => store.postById.data);
  const allFol = useSelector((store) => store.followers.data);
  const uniqueFollowers = allFol.reduce((acc, fol) => {
    acc[fol?.id] = fol;
    return acc;
  }, {});
  const allFollowers = Object.values(uniqueFollowers);
  const scrollUserRef = useRef();
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [inputChecked, setinputChecked] = useState([]);
  const handleBoxChange = (e, index) => {
    const updatedCheckbox = [...inputChecked];
    updatedCheckbox[index] = e.target.checked ? allFollowers[index].id : null;
    setinputChecked(updatedCheckbox);
  };
  const handleSendItems = (postById) => {
    let newValues = inputChecked.filter(
      (item) => item != null || item != undefined
    );
    dispatch(
      sendMessageToMultipleUsers({
        postId: postById?.id,
        checkedUser: newValues,
      })
    );
  };
  const handleInfiniteScroll = () => {
    if (
      scrollUserRef.current &&
      scrollUserRef.current.scrollTop +
        scrollUserRef.current.clientHeight +
        1 >=
        scrollUserRef.current.scrollHeight
    ) {
      setPage((page) => page + 1);
    }
  };
  const handleOnChange = (e) => {
    let searchInput = e.target.value.toLowerCase();
    let filteredUsers = allFollowers?.filter((item) =>
      item?.name.toLowerCase().includes(searchInput)
    );
    setFilteredUsers(filteredUsers);
  };
  const DebounceHandleOnChange = Debounce(handleOnChange, 300);
  useEffect(() => {
    ScrollUseEffect(scrollUserRef, handleInfiniteScroll);
  }, []);
  useEffect(() => {
    if (postValues != undefined) {
      dispatch(getPostByIdThunk({ postId: postValues }));
    }
  }, [postValues]);
  useEffect(() => {
    dispatch(getAllFollowersObjects({ page }));
  }, [page]);
  useEffect(() => {
    setFilteredUsers([...allFollowers]);
  }, [allFollowers?.length]);
  return (
    <div
      className="modal fade"
      id="staticBackdropPostSend"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Share
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-flex mb-3">
              <span className="mt-1">To :</span>
              <input
                type="text"
                className="form-control w-75 mx-4"
                placeholder="Search..."
                onChange={DebounceHandleOnChange}
              />
            </div>
            <div className="d-flex">
              <b className="text-decoration-underline mb-2">Suggested</b>
            </div>
            <div className="AllSendUsers" ref={scrollUserRef}>
              {filteredUsers?.map((item, index) => (
                <div className="oneSingleUser" key={index}>
                  <div className="col-md-1">
                    <img
                      src={`data:image/jpeg;base64,${item.profile}`}
                      className="sendUserImage"
                    />
                  </div>
                  <div className="col-md-10">
                    <div className="sendUserImageDescMain">
                      <span className="sendUserImageName">{item.name}</span>
                      <span className="sendUserImageDesc">
                        {item.description}
                      </span>
                    </div>
                  </div>
                  <div className="">
                    <label htmlFor="sendUserCheckbox" className="sendUserTick">
                      {inputChecked && inputChecked[index] ? (
                        <i
                          className={`fa-regular fa-circle-check bg-dark text-white rounded forCursor`}
                        />
                      ) : (
                        <i className="fa-regular fa-circle forCursor"></i>
                      )}
                    </label>
                    <input
                      type="checkbox"
                      className="checkBoxClass"
                      onChange={(e) => handleBoxChange(e, index)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-primary w-100"
              onClick={() => handleSendItems(postById)}
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PostSendModal;
