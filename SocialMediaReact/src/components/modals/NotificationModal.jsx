import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../../store/NotificationSlice";
import ScrollUseEffect from "../Hooks/ScrollUseEffect";
import { NotificationPostModal } from "./NotificationPostModal";
import { postValuesSliceActions } from "../../store/postValues";
const NotificationModal = React.memo(() => {
  const allNoti = useSelector((store) => store.notification.data);
  // Creating a mapping object with unique IDs
  const uniqueNotifications = allNoti.reduce((acc, notification) => {
    acc[notification.id] = notification;
    return acc;
  }, {});
  // Converting the mapping object back to an array
  const allNotifications = Object.values(uniqueNotifications);
  const [page, setPage] = useState(0);
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const [imgObj, setImgObj] = useState();
  const handlePostOpen = (imgVal) => {
    dispatch(postValuesSliceActions.updatePostValue(imgVal));
    setImgObj(imgVal);
  };
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
    ScrollUseEffect(scrollRef, handleScrollInfinite);
  }, []);
  useEffect(() => {
    dispatch(fetchNotifications());
  }, []);
  return (
    <>
      <NotificationPostModal imgObj={imgObj} />
      <div
        className="modal fade"
        id="staticBackdropNotification"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Notifications
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex">
                <b className="text-decoration-underline mb-2">Notifications</b>
              </div>
              <div className="AllSendUsers" ref={scrollRef}>
                {allNotifications.length == 0 && (
                  <div className="text-center my-4">
                    You Have No Notifications...
                  </div>
                )}
                {allNotifications != null &&
                  allNotifications.length > 0 &&
                  allNotifications?.map((item, index) => (
                    <div className="oneSingleUser" key={index}>
                      <div className="col-md-1">
                        {item?.user?.profile && (
                          <img
                            src={`data:image/jpeg;base64,${item?.user?.profile}`}
                            className="sendUserImage"
                          />
                        )}
                      </div>
                      <div className="col-md-8">
                        <div className="sendUserImageDescMain">
                          <span className="sendUserImageName">
                            <b>{item?.user?.name}</b> liked your post...
                          </span>
                        </div>
                      </div>
                      <div className="col-md-1"></div>
                      <div className="">
                        {item?.post?.image && (
                          <img
                            src={`data:image/jpeg;base64,${item?.post?.image}`}
                            alt=""
                            className="imageNotification"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdropNotificationPostModal"
                            onClick={() => handlePostOpen(item?.post)}
                          />
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default NotificationModal;
