import { db } from '../db';

const API_BASE_URL = 'http://hn.algolia.com/api/v1/';


export function fetchPosts(urlAppendage, page, itemsPerPage, query) {


    const url = `${API_BASE_URL}${urlAppendage}?query=${query}&restrictSearchableAttributes=author&numericFilters=num_comments=10&page=${page}&hitsPerPage=${itemsPerPage}`;


    return fetch(url)
        .then(response => response.json())
        .then(async data => {


            for (let post of data.hits) {
                try {
                    await db.posts.put({
                        objectID: post.objectID,
                        story_title: post.story_title,
                        author: post.author,
                        story_url: post.story_url,
                        created_at_i: post.created_at_i,
                    });
                } catch (e) {
                    console.log(
                        `failed to add page ${page} to database. ERROR HAPPENED! \n ${e}`
                    );
                }
            }


            return data;
        }).catch(async error => {
            console.error("Error fetching posts:", error);
            let totalPages;
            let numOfHits = 0;
            try {

                numOfHits = await db.posts
                    .filter((post) => new RegExp(query, 'i').test(post.author))
                    .count();

                totalPages = Math.ceil(
                    (numOfHits) / itemsPerPage
                );

                if (page > totalPages) {
                    console.log(
                        `We have not saved page ${page} in the local database and the call to the api is unsuccessful`
                    );
                    page = 1;
                }


                const posts = await db.posts
                    .orderBy("created_at_i")
                    .reverse()
                    .filter((post) => new RegExp(query, 'i').test(post.author))
                    .offset((page - 1) * itemsPerPage)
                    .limit(itemsPerPage)
                    .toArray();


                return {
                    hits: posts,
                    nbPages: totalPages,
                    nbHits: numOfHits,
                    page: page
                };
            } catch (err) {
                console.log(`Error while reading from database: ${err}`);
            }
        })

}












export function fetchPostComments(postId, page, itemsPerPage) {

    const url = `${API_BASE_URL}search?page=${page}&hitsPerPage=${itemsPerPage}&tags=comment,story_${postId}`;

    return fetch(url)
        .then(response => response.json())
        .then(async data => {

            for (let postComment of data.hits) {
                try {
                    await db.postComments.put({
                        objectID: postComment.objectID,
                        parent_id: postComment.parent_id,
                        story_id: postComment.story_id,
                        author: postComment.author,
                        comment_text: postComment.comment_text,
                        story_title: postComment.story_title,
                        story_url: postComment.story_url,
                    });

                } catch (e) {
                    console.log(
                        `failed to add comments of post with id ${this.id} to database. ERROR HAPPENED! \n ${e}`
                    );
                }
            }


            return data;
        }).catch(async error => {

            console.error("Error fetching post comments: (no internet maybe)", error);
            let totalPages;
            let numOfHits = 0;
            let postIdConvertedTo_NUMBER = Number(postId)
            try {
                numOfHits = await db.postComments
                    .where("story_id")
                    .equals(postIdConvertedTo_NUMBER)
                    .count();
                totalPages = Math.ceil(
                    (numOfHits) / itemsPerPage
                );

                if (page > totalPages) {
                    console.log(
                        `Comments: Page ${page} does not exist in the local database and the call to the api is unsuccessful`
                    );
                    page = 1;
                }

                const postComments = await db.postComments
                    .where("story_id")
                    .equals(postIdConvertedTo_NUMBER)
                    .offset((page - 1) * itemsPerPage)
                    .limit(itemsPerPage)
                    .toArray();

                const currState = await db.postComments.toArray();


                return {
                    hits: postComments,
                    nbPages: totalPages,
                    nbHits: numOfHits,
                    page: page
                };
            } catch (err) {
                console.log(`Comments: Error while reading from database: ${err}`);
            }
        })


}