import React, { Suspense, lazy } from "react";
import "../../App.css";
const Home = React.memo(() => {
  const SideBar = lazy(() => import("../sidebar/Sidebar"));
  const Rightbar = lazy(() => import("../right/Rightbar"));
  const NotificationModal = lazy(() => import("../modals/NotificationModal"));
  const PostMain = lazy(() => import("./PostMain"));
  const StoryMain = lazy(() => import("./StoryMain"));
  return (
    <>
      <Suspense
        fallback={
          <div>
            <div className="text-center">
              <div className="spinner-border text-dark mt-5" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        }
      >
        <NotificationModal />
        <div className="row g-0">
          <div className="d-flex">
            <SideBar />
            <div className="col-md-7 col-sm-9">
              <StoryMain />
              <PostMain />
            </div>
            <Rightbar />
          </div>
        </div>
      </Suspense>
    </>
  );
});

export default Home;
