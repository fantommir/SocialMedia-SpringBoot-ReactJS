import React from "react";
const StoryModal = React.memo(({ singleStory }) => {
  return (
    <div
      className="modal fade"
      id="staticBackdropStory"
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
              {singleStory?.user?.name}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {singleStory?.image && (
              <img
                src={`data:image/jpeg;base64,${singleStory?.image}`}
                className="SavedPostModalImage mx-4 mb-4"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default StoryModal;
