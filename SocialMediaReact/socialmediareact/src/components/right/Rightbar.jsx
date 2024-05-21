import React, { Suspense, lazy } from "react";
const RightbarHeader = lazy(() => import("./RightbarHeader"));
const SearchUsers = lazy(() => import("./SearchUsers"));
const AllUsers = lazy(() => import("./AllUsers"));
import "../styles/Rightbar.css";
const Rightbar = () => {
  return (
    <div className="col-md-3 RightbarMain">
      <div className="">
        <Suspense fallback={<div>Loading...</div>}>
          <RightbarHeader />
          <SearchUsers />
          <AllUsers />
        </Suspense>
      </div>
    </div>
  );
};

export default Rightbar;
