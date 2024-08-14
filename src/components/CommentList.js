import React from 'react';
import { useSelector } from 'react-redux';
import Comment from './Comment';
import SortingOptions from './SortingOptions';

const CommentList = () => {
  const comments = useSelector(state => state.comments);
  const sortBy = useSelector(state => state.sortBy);

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    }
    // Add more sorting options here if needed
    return 0;
  });

  return (
    <div className="comment-list">
      <SortingOptions />
      {sortedComments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;