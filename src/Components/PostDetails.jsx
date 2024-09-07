import React from 'react'
import { useParams } from 'react-router-dom'
import Grid from '@mui/material/Grid2';
import PostItem from './PostItem';
import { getSinglePostApi } from '../Apis/postsApi';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading';

export default function PostDetails() {
    let {id} = useParams()
    let { data ,isLoading} = useQuery({queryKey:['post',id],queryFn:()=>getSinglePostApi(id)})
   
    if(isLoading)
        return <Loading></Loading>
  return (
    <Grid container spacing={2}>
    <Grid size={{ xs: 6, md: 4 }}>

    </Grid>
    <Grid size={{ xs: 6, md: 4 }}>
        <PostItem postitem={data?.data?.post}></PostItem>
    </Grid>
    <Grid size={{ xs: 6, md: 4 }}>

    </Grid>

</Grid>
  )
}
