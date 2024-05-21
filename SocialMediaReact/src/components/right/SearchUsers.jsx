import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchedUsers } from "../../store/getAllUsersSlice";
import Debounce from "../Hooks/Debounce";

const SearchUsers = React.memo(() => {
  const dispatch = useDispatch();
  const handleChangeInput = (e) => {
    let searchInput = e.target.value.toLowerCase();
    dispatch(searchedUsers(searchInput));
  };
  const handleChangeDebounceMain = Debounce(handleChangeInput, 300);
  return (
    <div className="SearchUsers">
      <input
        type="text"
        placeholder="Search Users here"
        className="form-control w-75 m-auto mt-2"
        onChange={(e) => handleChangeDebounceMain(e)}
      />
    </div>
  );
});
export default SearchUsers;
