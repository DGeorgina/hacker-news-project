import Dexie from 'dexie';


export const db = new Dexie('myDatabase');
db.version(1).stores({
  posts: 'objectID, story_title, author, story_url, created_at_i', 
  postComments: 'objectID, story_id, parent_id, author, comment_text, story_title, story_url'
 
});
