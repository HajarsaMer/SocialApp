import { Avatar, Card, CardContent, CardHeader, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { darkmode } from '../Context/darkContext'
import { auth } from './../Context/auth';
import { useMutatinPosts } from '../hooks/useMutationPosts';
import { deleteComment } from '../Apis/commentsApi';


export default function CommentItem({commentitem}) {
 let {dark} = useContext(darkmode)
 let {user} = useContext(auth)
 let {mutate} = useMutatinPosts(deleteComment)

 function deleteCommentFn(id)
 {
   mutate(id)
 }



 
  return (
    <Card sx={{borderRadius:'0px',backgroundColor:dark?'#242526':'#fff',color:dark?'#fff':'#000'}}>
   
  
    <CardHeader
      avatar={
        <Avatar src={commentitem?.commentCreator?.photo}> 
        </Avatar>
      }
      
      title={commentitem?.commentCreator?.name}
    
    />
   
    <CardContent sx={{display:'flex',justifyContent:'space-between'}}>
      <Typography variant="body2" sx={{ color: dark?'text-white':'text.secondary' }}>
       {commentitem?.content}
      </Typography>
       {commentitem?.commentCreator?._id === user?.user? 
       <i onClick={()=>{deleteCommentFn(commentitem?._id)}} className='cursor-pointer fas fa-trash'></i>:''}
    </CardContent>
  
    </Card>
  )
}
