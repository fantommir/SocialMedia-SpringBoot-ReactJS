import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  // getAllMessagesCount,
  // getAllReceiverMessages,
  getAllSendMessages,
} from "../../store/MessageSlice";
import ScrollUseEffect from "../Hooks/ScrollUseEffect";
//footer
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import styles from "../styles/ChatFooter.module.css";
import Debounce from "../Hooks/Debounce";
import { sendMessage } from "../../store/MessageSlice";
import { getCurrentUser } from "../../store/TokenUserSlice";
const ChatMain = React.memo(() => {
  const tokenUser = useSelector((store) => store.tokenUser.data);
  const [messages, setMessages] = useState([]);
  const params = useParams();
  const { userId } = params;
  const handleAutoScrollRef = useRef();
  const [page, setPage] = useState(userId - userId);
  const allMsgs = useSelector((store) => store?.messages.data);
  const uniqueAllMsgs =
    allMsgs?.length > 0 &&
    allMsgs?.reduce((acc, msg) => {
      if (msg?.id) {
        acc[msg?.id] = msg;
      } else {
      }
      return acc;
    }, {});
  const allMessages = Object.values(uniqueAllMsgs).sort((a, b) => a.id - b.id);
  const allFollowers = useSelector((store) => store.followers.data);
  const User = allFollowers?.find((user) => user?.id == userId);
  const dispatch = useDispatch();
  const handleScrollInfinite = () => {
    if (
      handleAutoScrollRef.current &&
      handleAutoScrollRef.current.scrollTop +
        handleAutoScrollRef.current.clientHeight +
        1 >=
        handleAutoScrollRef.current.scrollHeight
    ) {
      setPage((page) => page + 1);
    }
  };
  useEffect(() => {
    ScrollUseEffect(handleAutoScrollRef, handleScrollInfinite);
  }, []);
  useEffect(() => {
    let isMounted = true; // Flag to track if the component is mounted
    const fetchData = async () => {
      try {
        if (tokenUser?.id != undefined) {
          const response = await dispatch(
            getAllSendMessages({
              receiverId: userId,
              page: page,
              tokenUserId: tokenUser?.id,
            })
          );
          if (isMounted) {
            // Check if the component is still mounted before updating state
            if (response.payload[0].includes("There is no Messages")) {
              setPage(0);
            }
            setMessages(response.payload);
          }
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchData();
    return () => {
      isMounted = false; // Set the flag to false when the component is unmounted
    };
  }, [page, userId, tokenUser?.id]);
  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);
  // useEffect(() => {
  //   dispatch(getAllMessagesCount({ receiverId: userId }));
  // }, []);
  //footer
  // useEffect(() => {
  //   dispatch(getAllSendMessages({ receiverId: userId, page: page }));
  // }, [userId]);
  const [toggleEmoji, setToogleEmoji] = useState(false);
  const InputRef = useRef("");
  const [searchBoxText, setSearchBoxText] = useState({
    text: "",
    image: "",
  });
  const HandleEmojiItems = (e) => {
    const selectedEmoji = e.native;
    const currentText = InputRef.current.value;
    const newText = currentText + selectedEmoji;
    setSearchBoxText({ ...searchBoxText, text: newText });
    InputRef.current.value = newText; // Update the input field value
  };

  const HandleOnclickEmoji = useCallback(
    (e) => {
      setToogleEmoji(!toggleEmoji);
    },
    [toggleEmoji]
  );
  // useEffect(() => {
  //   if (sendMessageData?.length) {
  //     handleAutoScrollRef.current.scrollTop =
  //       handleAutoScrollRef.current.scrollHeight;
  //   }
  // }, [sendMessageData?.length]);
  const HandleInputChange = async (e) => {
    setSearchBoxText({ ...searchBoxText, text: e.target.value });
    if (e.key == "Enter") {
      let messageData = new FormData();
      messageData.append("message", searchBoxText.text);
      messageData.append("image", searchBoxText.image);
      messageData.append("receiverId", userId);
      await dispatch(sendMessage(messageData));
      handleAutoScrollRef.current.scrollTop =
        handleAutoScrollRef.current.scrollHeight;
      e.target.value = "";
    }
  };
  const handleOnFileChange = (e) => {
    setSearchBoxText({ ...searchBoxText, image: e.target.files[0] });
  };
  const DebounceHandleOnChange = Debounce(HandleInputChange, 300);
  const handleOnSendMessage = async () => {
    let messageData = new FormData();
    messageData.append("message", searchBoxText.text);
    messageData.append("image", searchBoxText.image);
    messageData.append("receiverId", userId);
    await dispatch(sendMessage(messageData));
    handleAutoScrollRef.current.scrollTop =
      handleAutoScrollRef.current.scrollHeight;
    setSearchBoxText({ text: "", image: "" });
  };
  useEffect(() => {
    InputRef.current.focus();
  }, []);
  return (
    <>
      <div className="main">
        <div
          className="mainScroll"
          style={{
            backgroundImage: `url(data:image/jpeg;base64,${
              User != undefined ? User?.background : ""
            })`,
          }}
          ref={handleAutoScrollRef}
        >
          {allMessages?.length > 0 &&
            allMessages?.map((message, index) => {
              if (message?.sendUser?.id == userId) {
                return (
                  <>
                    <div className="d-flex justify-content-start">
                      {message && message?.image && (
                        <img
                          src={`data:image/jpeg;base64,${message?.image}`}
                          alt=""
                          className="img-fluid imagedivleft"
                        />
                      )}
                    </div>
                    <div>
                      {message && message?.text && (
                        <div className="imagedivleftText">{message?.text}</div>
                      )}
                    </div>
                  </>
                );
              } else if (message && message?.sendUser?.id === tokenUser?.id) {
                return (
                  <div className="row g-0">
                    <div className="col-sm-9"></div>
                    <div className="col-sm-2 allSendMessages">
                      {message && (
                        <div>
                          <div className="d-flex justify-content-end">
                            {message?.image && (
                              <img
                                src={`data:image/jpeg;base64,${message?.image}`}
                                alt=""
                                className="img-fluid imagedivright"
                              />
                            )}
                          </div>
                          {message?.text !== "" && (
                            <div className="imagedivrightText ">
                              {message?.text}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="col-sm-1"></div>
                  </div>
                );
              }
            })}
        </div>
      </div>
      <div className="footer">
        <div className={`${styles.pickerPlace}`}>
          {toggleEmoji && (
            <Picker data={data} onEmojiSelect={(e) => HandleEmojiItems(e)} />
          )}
        </div>
        <div className={`${styles.InputField}`}>
          <input
            type="search"
            name="text"
            className={`${styles.SearchBox}`}
            ref={InputRef}
            onChange={(e) => DebounceHandleOnChange(e)}
            onKeyDown={HandleInputChange}
          />
          <i
            className={`fa-regular fa-face-grin-hearts ${styles.Emojibtn}`}
            onClick={(e) => HandleOnclickEmoji(e)}
          />
          <span className={`${styles.sendBtn}`}>
            <label htmlFor="fileinput">
              <i className={`${styles.inputlabelWidth} fa-regular fa-image`} />
            </label>
            <input
              type="file"
              name="image"
              className={`${styles.inputFileWidth}`}
              id="fileinput"
              onChange={(e) => handleOnFileChange(e)}
            />
            <i className="bx bx-send" onClick={() => handleOnSendMessage()}></i>
          </span>
        </div>
      </div>
    </>
  );
});

export default ChatMain;
