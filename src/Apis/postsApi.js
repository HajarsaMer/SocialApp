import axios from "axios";


let token = localStorage.getItem('userToken')
export function getPostsApi() {
    return axios.get(`https://linked-posts.routemisr.com/posts?limit=50&page=20`, {
        headers: {
            token
        }
    })
}
export function getSinglePostApi(postId) {
    return axios.get(`https://linked-posts.routemisr.com/posts/${postId}`, {
        headers: {
            token
        }
    })
}
export function getUserPostsApi(postId) {
    return axios.get(`https://linked-posts.routemisr.com/users/${postId}/posts`, {
        headers: {
            token
        }
    })
}

//add post

export function addPost({body,image}) {
    let formData = new FormData()
    formData.append('body',body)
    formData.append('image',image)
    return  axios.post(`https://linked-posts.routemisr.com/posts`,formData, {
        headers: {
            token
        }
    })
}



