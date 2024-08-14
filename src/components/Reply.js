import React from 'react';
import { useDispatch } from 'react-redux';
import { likeReply } from '../redux/actions';
import { formatDate } from '../utils/dateUtils';
import { FaHeart } from 'react-icons/fa';

const Reply = ({ reply, commentId }) => {
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(likeReply(commentId, reply.id));
  };

  return (
    <div className="reply">
      <div className="reply-header">
        <h5>{reply.name}</h5>
        <span>{formatDate(reply.date)}</span>
      </div>
      <p>{reply.text}</p>
      <div className="reply-actions">
        <button onClick={handleLike} className="action-btn like-btn">
          <FaHeart /> {reply.likes || 0}
        </button>
      </div>
    </div>
  );
};

export default Reply;