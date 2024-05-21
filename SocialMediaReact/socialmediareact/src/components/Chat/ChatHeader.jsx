import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const ChatHeader = React.memo(() => {
  const params = useParams();
  const { userId } = params;
  const allFollowers = useSelector((store) => store?.followers?.data);
  let currentUser = allFollowers.find((item) => item?.id == userId);
  let toggleChatSearch = useSelector((store) => store.ChatToggleSlice);
  const HandleExitClick = () => {
    toggleChatSearch = !toggleChatSearch;
  };
  return (
    <div className="header">
      <div className="HeaderNameImage">
        {currentUser && currentUser?.profile && (
          <img
            src={`data:image/jpeg;base64,${currentUser?.profile}`}
            className="ImageHeader"
          />
        )}
        {currentUser && currentUser?.name && (
          <p className="NameMain">{currentUser?.name}</p>
        )}
      </div>
      <ul>
        <li className="LinksOfHeader px-3">
          <a href="">Home</a>
        </li>
        <li className="LinksOfHeader px-3">
          <a href="">Home</a>
        </li>
        <li className="LinksOfHeader px-3">
          <a href="">Home</a>
        </li>
        <li className="LinksOfHeader px-3">
          <a href="">Home</a>
        </li>
        <li className="LinksOfHeader px-3">
          <a href="">Home</a>
        </li>
        <li className="Home px-3">
          <span onClick={() => HandleExitClick()}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </span>
        </li>
      </ul>
    </div>
  );
});
export default ChatHeader;
