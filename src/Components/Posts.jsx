import React from 'react'
import { useQueryFn } from '../hooks/useQuery'
import { getPostsApi } from '../Apis/postsApi'
import PostItem from './PostItem';
import Grid from '@mui/material/Grid2';
import Loading from '../Loading';
import CreatePost from './CreatePost';
export default function Posts() {
    let { data ,isLoading} = useQueryFn('posts', getPostsApi)

    if(isLoading)
        return <Loading></Loading>
    return (
        <div>
            <Grid container spacing={2}>
                <Grid size={{ xs: 6, md: 4 }}>

                </Grid>
                <Grid size={{ xs: 6, md: 4 }}>
                    <CreatePost/>
                    {data?.data?.posts?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(post => <PostItem postitem={post} key={post._id}></PostItem>)}
                </Grid>
                <Grid size={{ xs: 6, md: 4 }}>

                </Grid>

            </Grid>
        </div>
    )
}
