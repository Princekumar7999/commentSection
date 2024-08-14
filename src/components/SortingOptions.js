import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortComments } from '../redux/actions';

const SortingOptions = () => {
  const dispatch = useDispatch();
  const currentSort = useSelector(state => state.sortBy);

  const handleSort = (sortBy) => {
    dispatch(sortComments(sortBy));
  };

  return (
    <div className="sorting-options">
      <span>Sort By: </span>
      <select value={currentSort} onChange={(e) => handleSort(e.target.value)}>
        <option value="date">Date and Time ↓</option>
        {/* Add more sorting options here if needed */}
      </select>
    </div>
  );
};

export default SortingOptions;