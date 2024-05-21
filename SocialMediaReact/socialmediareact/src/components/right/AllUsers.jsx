import React, { useEffect, useState } from "react";
import { fetchAllUsers } from "../../store/getAllUsersSlice";
import { useDispatch, useSelector } from "react-redux";
import { followUser } from "../../store/TokenUserSlice";
const AllUsers = React.memo(() => {
  const allPageUsers = useSelector((store) => store.getAllUsers);
  const tokenUserId = useSelector((store) => store.tokenUser.data);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const handlePrevPage = () => {
    if (page > 0) {
      setPage((page) => page - 1);
    }
  };
  const handleNextPage = () => {
    if (allPageUsers.data.length > 0) {
      setPage((page) => page + 1);
    }
  };
  const handleFollowUser = (item) => {
    dispatch(followUser(item?.id));
  };
  useEffect(() => {
    dispatch(fetchAllUsers(page));
  }, [page]);
  return (
    <>
      <ul className="list-group">
        <div className="allUsersFollow">
          {/* {allPageUsers?.data?.length == 1 && (
            <li className="list-group-item text-center">
              There is No Users to Follow...
            </li>
          )} */}
          {allPageUsers?.data?.length !== 0 ? (
            allPageUsers?.data?.map(
              (item, index) =>
                item?.id != tokenUserId?.id && (
                  <li className="list-group-item" key={index}>
                    <div className="postHeading">
                      <img
                        src={`data:image/jpeg;base64,${item?.profile}`}
                        alt="profilepic"
                        className="postProfilePic"
                      />
                      <div className="postNameandDesc">
                        <span>{item.name}</span>
                        <span className="small">@{item.name}</span>
                      </div>
                      <div className="followOption">
                        {tokenUserId?.followings?.some(
                          (id) => id === item?.id
                        ) ? (
                          <i
                            className="fa-solid fa-user-xmark"
                            onClick={() => handleFollowUser(item)}
                          ></i>
                        ) : (
                          <i
                            className="fa-solid fa-user-plus"
                            onClick={() => handleFollowUser(item)}
                          ></i>
                        )}
                      </div>
                    </div>
                  </li>
                )
            )
          ) : (
            <ul className="list-group">
              <li className="list-group-item text-secondary text-center">
                No User Left
              </li>
            </ul>
          )}
        </div>
      </ul>
      <div className="list-group">
        <div className="list-group-item d-flex">
          <div className="col-sm-1">
            <i
              onClick={() => handlePrevPage()}
              className="fa-solid fa-angles-left leftArrow"
            />
          </div>
          <div className="col-sm-10"></div>
          <div className="col-sm-1">
            <i
              onClick={() => handleNextPage()}
              className="fa-solid fa-angles-right rightArrow"
            />
          </div>
        </div>
      </div>
    </>
  );
});

export default AllUsers;
