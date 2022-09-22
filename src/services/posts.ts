/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

export const fetchPosts = async (page: number) => {
  console.log('~ page', page)
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}posts?_limit=10&page=${page}`
  )
  return await response.json()
}
