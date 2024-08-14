import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editComment, deleteComment, addReply, likeComment } from '../redux/actions';
import Reply from './Reply';
import { formatDate } from '../utils/dateUtils';
import { FaHeart, FaReply, FaEdit, FaTrash } from 'react-icons/fa';

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
    dispatch(likeComment(comment.id));
  };
  return (
    <div className="comment">
      <div className="comment-header">
        <h4>{comment.name}</h4>
        <span>{formatDate(comment.date)}</span>
      </div>
      {isEditing ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="edit-textarea"
        />
      ) : (
        <p>{comment.text}</p>
      )}
      <div className="comment-actions">
        <button onClick={handleLike} className="action-btn like-btn">
          <FaHeart /> {comment.likes || 0}
        </button>
        <button onClick={() => setShowReplyForm(!showReplyForm)} className="action-btn reply-btn">
          <FaReply /> Reply
        </button>
        {isEditing ? (
          <button onClick={handleEdit} className="action-btn edit-btn">
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="action-btn edit-btn">
            <FaEdit /> Edit
          </button>
        )}
        <button onClick={handleDelete} className="action-btn delete-btn">
          <FaTrash /> Delete
        </button>
      </div>

  
      {showReplyForm && (
        <div className="reply-form">
          <input
            type="text"
            placeholder="Your Name"
            value={replyName}
            onChange={(e) => setReplyName(e.target.value)}
          />
          <textarea
            placeholder="Your Reply"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button onClick={handleReply}>Post Reply</button>
        </div>
      )}
      <div className="replies">
        {comment.replies.map(reply => (
          <Reply key={reply.id} reply={reply} commentId={comment.id} />
        ))}
      </div>
    </div>
  );
};

export default Comment;