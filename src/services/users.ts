/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

export const fetchUsers = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}users`
  )
  return await response.json()
}
