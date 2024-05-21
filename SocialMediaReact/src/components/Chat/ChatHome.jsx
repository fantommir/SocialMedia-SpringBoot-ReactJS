import React, { Suspense, lazy, useEffect } from "react";
import "../styles/ChatMessages.css";
const ChatSidebar = lazy(() => import("./ChatSidebar"));
const ChatHeader = lazy(() => import("./ChatHeader"));
const ChatMain = lazy(() => import("./ChatMain"));
const ChatFooter = lazy(() => import("./ChatFooter"));
function ChatEmptyHome() {
  return (
    <div className="containerr">
      <Suspense fallback={<div>Loading...</div>}>
        <ChatHeader />
        <ChatSidebar />
        <ChatMain />
        {/* <ChatFooter /> */}
      </Suspense>
    </div>
  );
}

export default ChatEmptyHome;
