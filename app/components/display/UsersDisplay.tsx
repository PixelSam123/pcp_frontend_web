import { UserBriefDto } from '@/types/types'

export default function UsersDisplay({ users }: { users: UserBriefDto[] }) {
  if (users.length === 0) {
    return <p>No users found</p>
  }

  return (
    <table className="border-collapse border border-white">
      <thead>
        <tr>
          <th className="border border-white px-3 py-1">#</th>
          <th className="border border-white px-3 py-1">Name</th>
          <th className="border border-white px-3 py-1">Points</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, idx) => (
          <tr key={user.id}>
            <td className="border border-white px-3 py-1">{idx + 1}</td>
            <td className="border border-white px-3 py-1">{user.name}</td>
            <td className="border border-white px-3 py-1">{user.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
