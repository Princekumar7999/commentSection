export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const ADD_REPLY = 'ADD_REPLY';
export const SORT_COMMENTS = 'SORT_COMMENTS';
export const LIKE_COMMENT = 'LIKE_COMMENT';
export const LIKE_REPLY = 'LIKE_REPLY';
export const TOGGLE_LIKE_COMMENT = 'TOGGLE_LIKE_COMMENT';
export const TOGGLE_LIKE_REPLY = 'TOGGLE_LIKE_REPLY';

export const addComment = (name, text) => ({
  type: ADD_COMMENT,
  payload: { name, text, date: new Date().toISOString() }
});

export const editComment = (id, text) => ({
  type: EDIT_COMMENT,
  payload: { id, text }
});

export const deleteComment = (id) => ({
  type: DELETE_COMMENT,
  payload: { id }
});

export const addReply = (parentId, name, text) => ({
  type: ADD_REPLY,
  payload: { parentId, name, text, date: new Date().toISOString() }
});

export const sortComments = (sortBy) => ({
  type: SORT_COMMENTS,
  payload: { sortBy }
});
export const likeComment = (id) => ({
    type: LIKE_COMMENT,
    payload: { id }
  });
  
  export const likeReply = (commentId, replyId) => ({
    type: LIKE_REPLY,
    payload: { commentId, replyId }
  });
  export const toggleLikeComment = (id) => ({
    type: TOGGLE_LIKE_COMMENT,
    payload: { id }
  });
  
  export const toggleLikeReply = (commentId, replyId) => ({
    type: TOGGLE_LIKE_REPLY,
    payload: { commentId, replyId }
  });