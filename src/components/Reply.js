import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleLikeReply } from '../redux/actions';
import { formatDate } from '../utils/dateUtils';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import styles from '../styles.css';

const Reply = ({ reply, commentId }) => {
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(toggleLikeReply(commentId, reply.id));
  };

  return (
    <div className={styles.reply}>
      <div className={styles.replyHeader}>
        <h5>{reply.name}</h5>
        <span className={styles.date}>{formatDate(reply.date)}</span>
      </div>
      <p>{reply.text}</p>
      <div className={styles.actions}>
        <button onClick={handleLike} className={`${styles.actionBtn} ${styles.likeBtn}`}>
          {reply.likes ? <FaHeart /> : <FaRegHeart />} {reply.likes || 0}
        </button>
      </div>
    </div>
  );
};

export default Reply;