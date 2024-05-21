import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.js";
const App = lazy(() => import("./App.jsx"));
const Home = lazy(() => import("./components/main/Home.jsx"));
const Login = lazy(() => import("./components/start/Login.jsx"));
const Register = lazy(() => import("./components/start/Register.jsx"));
const ChatHome = lazy(() => import("./components/Chat/ChatHome.jsx"));
const ProfileMain = lazy(() => import("./components/profile/ProfileMain.jsx"));
const SavedPostsMain = lazy(() =>
  import("./components/savedPosts/SavedPostsMain.jsx")
);
import { BrowserRouter, Route, Routes } from "react-router-dom";
const ChatEmptyHome = lazy(() => import("./components/Chat/ChatEmptyHome.jsx"));
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
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
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/messages" element={<ChatEmptyHome />} />
          <Route path="/messages/userId/:userId" element={<ChatHome />} />
          <Route path="/profile" element={<ProfileMain />} />
          <Route path="/savedposts" element={<SavedPostsMain />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </Provider>
);
