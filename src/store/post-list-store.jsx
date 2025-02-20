import { createContext, useReducer } from "react";

export const PostList = createContext({ 
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === 'DELETE_POST'){
    newPostList = currPostList.filter(post => post.id !== action.payload.postId)
  }
  else if (action.type === 'ADD_POST') {
   newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
}

const PostListProvider = ({children}) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, DEFAULT_POST_LIST);
  
  const addPost = (userId, postTitle, postBody, reactions, tags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
      title: postTitle,
      body: postBody,
      reactions: reactions,
      userId: userId,
      tags: tags,
      }
    })
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: 'DELETE_POST',
      payload: {
        postId,
      }
    })
  };
  

  return (
   <PostList.Provider value={
   {postList,
    addPost,
    deletePost,
   }
  }>
    {children}
  </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [{
  id: '1',
  title: ' Learning React',
  body: 'Hi, friends I am going to learn react. Join with me on this journey. ',
  reactions: 4000,
  userId: 'user_1',
  tags: ['#amazing', '#free', '#bestexperience'],
},
{
  id: '2',
  title: 'Going on a tour',
  body: 'I am going on a tour to Nainital. To experience the nature.  ',
  reactions: 10000,
  userId: 'user_9',
  tags: ['#mountains', '#peace', '#baeutyofnature'],
},
]

export default PostListProvider;