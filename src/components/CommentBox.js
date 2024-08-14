import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../redux/actions';

const CommentBox = () => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && text.trim()) {
      dispatch(addComment(name, text));
      setName('');
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-box">
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Drop your thoughts..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button type="submit">Post It! 🚀</button>
    </form>
  );
};

export default CommentBox;