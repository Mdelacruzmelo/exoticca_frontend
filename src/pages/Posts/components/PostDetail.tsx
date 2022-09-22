/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { TransitionProps } from '@mui/material/transitions'
import { useAppDispatch, useAppSelector } from 'hooks'
import { closePostDetail, setPostDetail } from 'store/slicePosts'
import {
  TextField,
  Button,
  Dialog,
  ListItemText,
  ListItem,
  List,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { updatePost, deletePost } from 'services/posts'

const Transition = React.forwardRef(function Transition (
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const PostDetail: React.FC = () => {
  const dispatch = useAppDispatch()
  const { detailOpened, postDetail } = useAppSelector(state => state.posts)
  const usersList = useAppSelector(state => state.users.list)

  const [newTitle, setNewTitle] = useState<string | undefined>(postDetail?.title)
  const [newBody, setNewBody] = useState<string | undefined>(postDetail?.body)

  useEffect(() => {
    setNewTitle(postDetail?.title)
    setNewBody(postDetail?.body)
  }, [postDetail])

  let username: string | null = null

  const results = usersList.filter(user => {
    return user.id === postDetail?.userId
  })
  if (results.length > 0) {
    username = results[0].username
  }

  const updateMutation = useMutation(async () => await updatePost({
    id: postDetail?.id,
    userId: postDetail?.userId,
    title: newTitle ?? '',
    body: newBody ?? ''
  }))

  const deleteMutation = useMutation(async (postId: number) => await deletePost(postId))

  const reinitializeForm = (): void => {
    setNewTitle(undefined)
    setNewBody(undefined)
    dispatch(setPostDetail(undefined))
    dispatch(closePostDetail())
  }

  return (
    <Dialog
      fullScreen
      open={detailOpened}
      onClose={reinitializeForm}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={reinitializeForm}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit post
          </Typography>
          <Button autoFocus color="inherit"
            onClick={() => {
              if (postDetail?.id) {
                deleteMutation.mutate(postDetail.id)
                reinitializeForm()
              }
            }}>
              delete
          </Button>
          <Button autoFocus color="inherit"
            onClick={() => {
              updateMutation.mutate()
              reinitializeForm()
            }}>
              save
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem>
        </ListItem>
        <ListItem>
          <TextField
            fullWidth
            value={newTitle}
            label="Title"
            defaultValue=""
            onChange={(event) => { setNewTitle(event?.target.value) }}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText secondary={username ? `Author: ${username}` : ''}>
            <TextField
              fullWidth
              label="Content"
              placeholder="Post content"
              multiline
              rows={10}
              maxRows={4}
              value={newBody}
              onChange={(event) => { setNewBody(event?.target.value) }}
            />
          </ListItemText>
        </ListItem>
      </List>
    </Dialog>
  )
}

export default PostDetail
