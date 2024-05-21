import React, { Suspense, lazy } from "react";
import "../styles/ChatMessages.css";
const ChatFooterEmpty = lazy(() => import("./ChatFooterEmpty"));
const ChatMainEmpty = lazy(() => import("./ChatMainEmpty"));
const ChatHeaderEmptyy = lazy(() => import("./ChatHeaderEmptyy"));
const ChatSidebar = lazy(() => import("./ChatSidebar"));
function ChatEmptyHome() {
  return (
    <div className="containerr">
      <Suspense fallback={<div>Loading...</div>}>
        <ChatHeaderEmptyy />
        <ChatSidebar />
        <ChatMainEmpty />
        <ChatFooterEmpty />
      </Suspense>
    </div>
  );
}

export default ChatEmptyHome;
