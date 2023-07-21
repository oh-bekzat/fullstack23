import { Link } from 'react-router-dom'
import userService from '../services/users'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUsers } from '../reducers/usersReducer'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  useEffect(() => {
    userService.getAll().then((userList) => {
      dispatch(setUsers(userList))
    })
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
