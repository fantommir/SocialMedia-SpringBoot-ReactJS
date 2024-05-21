import React, { useCallback, useEffect, useRef, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import styles from "../styles/ChatFooter.module.css";
import { useParams } from "react-router-dom";
import Debounce from "../Hooks/Debounce";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../store/MessageSlice";
const ChatFooter = React.memo(() => {
  const params = useParams();
  const { userId } = params;
  const dispatch = useDispatch();
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
  const HandleInputChange = (e) => {
    setSearchBoxText({ ...searchBoxText, text: e.target.value });
    if (e.key == "Enter") {
      let messageData = new FormData();
      messageData.append("message", searchBoxText.text);
      messageData.append("image", searchBoxText.image);
      messageData.append("receiverId", userId);
      dispatch(sendMessage(messageData));
    }
  };
  const handleOnFileChange = (e) => {
    setSearchBoxText({ ...searchBoxText, image: e.target.files[0] });
  };
  const DebounceHandleOnChange = Debounce(HandleInputChange, 300);
  const handleOnSendMessage = () => {
    let messageData = new FormData();
    messageData.append("message", searchBoxText.text);
    messageData.append("image", searchBoxText.image);
    messageData.append("receiverId", userId);
    dispatch(sendMessage(messageData));
    setSearchBoxText({ text: "", image: "" });
  };
  useEffect(() => {
    InputRef.current.focus();
  }, []);
  return (
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
  );
});

export default ChatFooter;
