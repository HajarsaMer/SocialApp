import React, { useState } from 'react'
import { Card, CardContent, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { addPost } from '../Apis/postsApi';
import { useMutatinPosts } from '../hooks/useMutationPosts';
export default function CreatePost() {

    let { mutate, data } = useMutatinPosts(addPost)
    let [body, setBody] = useState('')
    let [image, setimage] = useState('')
    let [imageSrc, setimageSrc] = useState('')

    function handleAddPost(e) {
        e.preventDefault()
         mutate({ body, image })
        if (data?.data?.message == 'success') {
            setimage('')
            setimageSrc(null)
            setBody('')
        }
    }


    function getImagePath(e) {
        if (e.target.files[0]) {
            setimage(e.target.files[0])
            let path = URL.createObjectURL(e.target.files[0])
            setimageSrc(path)
        }
    }
    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Create a post
                </Typography>
                <form onSubmit={handleAddPost}>
                    <Stack spacing={2}>
                        <TextField value={body} onChange={(e) => setBody(e.target.value)} label="Post" fullWidth multiline rows={4} variant="outlined" />
                        <TextField onChange={getImagePath} type="file" fullWidth variant="outlined" />
                        <Button type="submit" variant="contained">Add Post</Button>
                        {imageSrc ? <img src={imageSrc} width="100%" /> : ''}
                    </Stack>
                </form>
            </CardContent>
        </Card>
    )
}