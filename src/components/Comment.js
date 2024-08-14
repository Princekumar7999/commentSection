import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editComment, deleteComment, addReply, toggleLikeComment } from '../redux/actions';
import Reply from './Reply';
import { formatDate } from '../utils/dateUtils';
import { FaHeart, FaRegHeart, FaReply, FaEdit, FaTrash } from 'react-icons/fa';
import styles from '../styles.css';

const Comment = ({ comment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [replyName, setReplyName] = useState('');
  const [replyText, setReplyText] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    if (editedText.trim()) {
      dispatch(editComment(comment.id, editedText));
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteComment(comment.id));
  };

  const handleReply = () => {
    if (replyName.trim() && replyText.trim()) {
      dispatch(addReply(comment.id, replyName, replyText));
      setReplyName('');
      setReplyText('');
      setShowReplyForm(false);
    }
  };

  const handleLike = () => {
    dispatch(toggleLikeComment(comment.id));
  };

  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <h4>{comment.name}</h4>
        <span className={styles.date}>{formatDate(comment.date)}</span>
      </div>
      {isEditing ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className={styles.editTextarea}
        />
      ) : (
        <p>{comment.text}</p>
      )}
      <div className={styles.actions}>
        <button onClick={handleLike} className={`${styles.actionBtn} ${styles.likeBtn}`}>
          {comment.likes ? <FaHeart /> : <FaRegHeart />} {comment.likes || 0}
        </button>
        <button onClick={() => setShowReplyForm(!showReplyForm)} className={`${styles.actionBtn} ${styles.replyBtn}`}>
          <FaReply /> Reply
        </button>
        {isEditing ? (
          <button onClick={handleEdit} className={`${styles.actionBtn} ${styles.editBtn}`}>
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className={`${styles.actionBtn} ${styles.editBtn}`}>
            <FaEdit /> Edit
          </button>
        )}
        <button onClick={handleDelete} className={`${styles.actionBtn} ${styles.deleteBtn}`}>
          <FaTrash /> Delete
        </button>
      </div>
      {showReplyForm && (
        <div className={styles.replyForm}>
          <input
            type="text"
            placeholder="Your Name"
            value={replyName}
            onChange={(e) => setReplyName(e.target.value)}
            className={styles.input}
          />
          <textarea
            placeholder="Your Reply"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className={styles.textarea}
          />
          <button onClick={handleReply} className={styles.button}>Post Reply</button>
        </div>
      )}
      <div className={styles.replies}>
        {comment.replies.map(reply => (
          <Reply key={reply.id} reply={reply} commentId={comment.id} />
        ))}
      </div>
    </div>
  );
};

export default Comment;