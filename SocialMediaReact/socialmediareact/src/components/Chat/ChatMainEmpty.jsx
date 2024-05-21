import React from "react";

const ChatMainEmpty = React.memo(() => {
  return (
    <div className="main">
      <div className="row g-0">
        <div className="col-sm-5"></div>
        <div className="col-sm-4">
          <div className="middleEmtpyMessage d-flex flex-column">
            <i className="fa-brands fa-signal-messenger"></i>
            <div className="messageMatter">Send Messages</div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ChatMainEmpty;
