import React, { useContext } from 'react'
import { auth } from '../Context/auth'
import { getUserPostsApi } from '../Apis/postsApi'
import { useQuery } from '@tanstack/react-query'
import  Grid  from '@mui/material/Grid2';
import PostItem from './PostItem';

export default function Profile() {
    let { user } = useContext(auth)

    let { data } = useQuery({ queryKey: ['profile', user?.user], queryFn: () => getUserPostsApi(user?.user) })

    return (
        <div>
            <Grid container spacing={2}>
                <Grid size={{ xs: 6, md: 4 }}>

                </Grid>
                <Grid size={{ xs: 6, md: 4 }}>
                    {data?.data?.posts?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(post => <PostItem postitem={post} key={post._id}></PostItem>)}
                </Grid>
                <Grid size={{ xs: 6, md: 4 }}>

                </Grid>

            </Grid>
        </div>
    )
}
