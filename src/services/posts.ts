/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { Post, PostFilter } from 'types'

export const fetchPosts = async (postFilter: PostFilter) => {
  let postUrl = 'posts'

  const postParams = []

  if (postFilter?.authorId) postParams.push(`userId=${postFilter.authorId}`)
  if (postFilter?.title) postParams.push(`title_like=^${postFilter.title}`)

  if (postParams.length > 0) postUrl += `?${postParams.join('&')}`

  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}${postUrl}`
  )
  return await response.json()
}

export const updatePost = async (post: Post | undefined) => {
  if (post) {
    await fetch(`${process.env.REACT_APP_BASE_URL}posts/${post.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: post?.title,
        body: post?.body
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(async (response) => await response.json())
  }
}
