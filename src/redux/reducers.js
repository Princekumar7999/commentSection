import { 
    ADD_COMMENT, 
    EDIT_COMMENT, 
    DELETE_COMMENT, 
    ADD_REPLY, 
    SORT_COMMENTS,
    TOGGLE_LIKE_COMMENT,
    TOGGLE_LIKE_REPLY
  } from './actions';
  import { loadState, saveState } from '../utils/storage';
  
  const initialState = loadState() || {
    comments: [],
    sortBy: 'date'
  };
  
  const rootReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
      case TOGGLE_LIKE_COMMENT:
        newState = {
          ...state,
          comments: state.comments.map(comment =>
            comment.id === action.payload.id
              ? { ...comment, likes: comment.likes ? 0 : 1 }
              : comment
          )
        };
        break;
  
      case TOGGLE_LIKE_REPLY:
        newState = {
          ...state,
          comments: state.comments.map(comment =>
            comment.id === action.payload.commentId
              ? {
                  ...comment,
                  replies: comment.replies.map(reply =>
                    reply.id === action.payload.replyId
                      ? { ...reply, likes: reply.likes ? 0 : 1 }
                      : reply
                  )
                }
              : comment
          )
        };
        break;
  
      case ADD_COMMENT:
        newState = {
          ...state,
          comments: [
            { id: Date.now(), ...action.payload, replies: [], likes: 0 },
            ...state.comments
          ]
        };
        break;
      
      case EDIT_COMMENT:
        newState = {
          ...state,
          comments: state.comments.map(comment =>
            comment.id === action.payload.id
              ? { ...comment, text: action.payload.text }
              : comment
          )
        };
        break;
  
      case DELETE_COMMENT:
        newState = {
          ...state,
          comments: state.comments.filter(comment => comment.id !== action.payload.id)
        };
        break;
  
      case ADD_REPLY:
        newState = {
          ...state,
          comments: state.comments.map(comment =>
            comment.id === action.payload.parentId
              ? { ...comment, replies: [...comment.replies, { id: Date.now(), ...action.payload, likes: 0 }] }
              : comment
          )
        };
        break;
  
      case SORT_COMMENTS:
        newState = {
          ...state,
          sortBy: action.payload.sortBy
        };
        break;
  
      default:
        return state;
    }
    saveState(newState);
    return newState;
  };
  
  export default rootReducer;