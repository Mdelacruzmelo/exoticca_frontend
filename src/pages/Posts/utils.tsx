import { IconButton, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { Post, PostColumn, User } from 'types'

export const getPostColumns = (usersList: User[]): PostColumn[] => {
  return [
    {
      id: 'userId',
      label: 'Author',
      minWidth: 120,
      format: (value: number) => {
        const results = usersList.filter(user => {
          return user.id === value
        })
        if (results.length > 0) {
          return (
            <div>
              {results[0].username}
            </div>
          )
        }
        return null
      }
    },
    { id: 'title', label: 'Post title', minWidth: 170 },
    {
      id: 'body',
      label: 'Content',
      minWidth: 300,
      format: (value: string) => (<Typography>
        {value.substring(0, 100)}...
      </Typography>
      )
    },
    { id: 'actions', label: 'Actions', minWidth: 100 }
  ]
}

export const getPostRows = (posts: Post[] | undefined): Post[] => {
  const rows = (posts != null)
    ? posts.map(({ id, userId, title, body }: Post) => {
      return {
        id,
        userId,
        title,
        body,
        actions: (
          <>
            <IconButton size="small" onClick={() => { console.info('open modal or sidepanel') }}>
              <EditIcon />
            </IconButton>
            <IconButton size="small" onClick={() => { console.info('open modal or sidepanel') }}>
              <RemoveRedEyeIcon />
            </IconButton>
          </>
        )
      }
    })
    : []

  return rows
}
