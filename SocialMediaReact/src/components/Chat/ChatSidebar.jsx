import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../store/TokenUserSlice";
import Debounce from "../Hooks/Debounce";
import { Link } from "react-router-dom";
import { getAllFollowersObjects } from "../../store/followersSlice";
import ScrollUseEffect from "../Hooks/ScrollUseEffect";
const ChatSidebar = React.memo(() => {
  const tokenUser = useSelector((store) => store.tokenUser.data);
  const allFollowersValues = useSelector((store) => store?.followers?.data);
  const uniqueAllFollowers = allFollowersValues.reduce((acc, allfoll) => {
    acc[allfoll?.id] = allfoll;
    return acc;
  }, {});
  const allFollowers = Object.values(uniqueAllFollowers);
  const [allSearchedFollowers, setAllSearchedFollowers] = useState([]);
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const [page, setPage] = useState(0);
  const HandleOnChange = (e) => {
    let newItem = allFollowers.filter((item) =>
      item?.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setAllSearchedFollowers(newItem);
  };
  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);
  const DebounceOnChange = Debounce(HandleOnChange, 300);
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
    if (allSearchedFollowers?.length == 0) {
      setAllSearchedFollowers([...allFollowers]);
    }
  }, [allFollowersValues?.length, page]);
  useEffect(() => {
    ScrollUseEffect(scrollRef, handleScrollInfinite);
  }, []);
  useEffect(() => {
    dispatch(getAllFollowersObjects({ page }));
    setAllSearchedFollowers([...allFollowers]);
  }, [page]);
  const handleTokenReset = () => {
    localStorage.removeItem("token");
  };
  return (
    <div className="sidebar">
      <div className="sidebarcontent">
        <p className="text-center py-3 position-fixed Heading">
          {tokenUser?.name}
        </p>
        <div className="outerBoxDiv">
          <input
            type="search"
            placeholder="Search..."
            className="SearchBox form-control"
            onChange={(e) => DebounceOnChange(e)}
          />
        </div>
        <div className="singleUserMain" ref={scrollRef}>
          {allSearchedFollowers.length == 0 && (
            <div className="text-white text-center mt-5">
              you dont have any followers...
            </div>
          )}
          {allSearchedFollowers &&
            allSearchedFollowers?.map((user, index) => (
              <Link
                to={`/messages/userId/${user?.id}`}
                className="links list-group "
                key={index}
              >
                <div className="singleUser list-group-item list-group-item-dark">
                  <div className="d-flex">
                    {user && user?.profile != undefined && (
                      <img
                        src={`data:image/jpeg;base64,${user?.profile}`}
                        alt=""
                        className="singleChatUser"
                      />
                    )}
                    <div className="NameandDesc d-flex flex-column mx-2">
                      <span>
                        <b className="userName">{user?.name}</b>
                      </span>
                      <span className="userName">@{user?.name}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
      <div className="containerrrDropDown text-center">
        <div className="dropdown d-inline-block mt-3">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {tokenUser && tokenUser?.profile && (
              <img
                src={`data:image/jpeg;base64,${tokenUser?.profile}`}
                alt=""
                width="32"
                height="32"
                className="rounded-circle me-2 profilePic object-fit-cover"
              />
            )}
            <strong>Uday Kumarrr</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link
                to="/login"
                className="dropdown-item"
                onClick={handleTokenReset}
              >
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
});

export default ChatSidebar;
