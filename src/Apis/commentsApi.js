import axios from "axios";


let token = localStorage.getItem('userToken')

export function addComment({ content, post }) {
    return axios.post('https://linked-posts.routemisr.com/comments', { content, post }, { headers: { token } })
}

export function deleteComment(commmId) {
    return axios.delete(`https://linked-posts.routemisr.com/comments/${commmId}`, { headers: { token } })
}

