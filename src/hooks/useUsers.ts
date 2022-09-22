/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from 'services/users'

const useUsers = () => {
  const { data, isLoading } = useQuery(['landings'], fetchUsers)
  return [data, isLoading]
}

export default useUsers
