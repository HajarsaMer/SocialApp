import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Link, useLocation } from 'react-router-dom';
import CommentItem from './CommentItem';
import { darkmode } from '../Context/darkContext';
import { useMutatinPosts } from './../hooks/useMutationPosts';
import { addComment } from './../Apis/commentsApi';






export default function PostItem({ postitem }) {
  const { pathname } = useLocation()


  const [expanded, setExpanded] = React.useState(false);

  let { dark } = React.useContext(darkmode)
  let [content, setcontent] = React.useState('')
  let { data, mutate,isPending } = useMutatinPosts(addComment)
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function addCommentFn(e) {
    setcontent(e.target.value)
    if (e.key == 'Enter') {
      mutate({ content, post: postitem._id })
      if (data?.data?.message == 'success')
        setcontent('')
    }
  }
console.log(data);


  return (
    <Card sx={{ margin: '20px 0px', backgroundColor: dark ? '#242526' : '#fff', color: dark ? '#fff' : '#000' }}>

      <CardHeader
        avatar={
          <Avatar src={postitem?.user?.photo}>
          </Avatar>
        }

        title={postitem?.user?.name}

      />
      <CardMedia
        component="img"
        height="194"
        image={postitem?.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: dark ? 'text-white' : 'text.secondary' }}>
          {postitem?.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon sx={{ color: '#187FFE' }} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon sx={{ color: '#F44336' }} />
        </IconButton>

      </CardActions>


      <input onKeyUp={addCommentFn} className='dark:bg-[#3A3B3C]  dark:border-[#3A3B3C] border-2 border-[#eee]' placeholder='write a comment' style={{ padding: '5px', width: '90%', margin: '20px auto', display: 'block', borderRadius: '20px' }} />

      {pathname == '/' ? <>
        {postitem?.comments?.length ?
          <>
            <CommentItem commentitem={postitem?.comments[0]} />
            <p style={{ margin: '20px', fontSize: '1rem' }} ><Link to={`/postdetails/${postitem?._id}`}>View more comments</Link></p>
          </> : ''}
      </> : <>

        {(data?.data?.comments?.length)?data?.data?.comments.map((comment) => <CommentItem key={comment?.key} commentitem={comment}> </CommentItem>):
        postitem?.comments?.map((comment) => <CommentItem key={comment?.key} commentitem={comment}>
        </CommentItem>)
        }
      </>}


    



    </Card>
  );
}
