import { useUsers } from "../services/queries";

export default function Users() {
  const { data } = useUsers();

  return (
    <ul>
      {data?.map((user) => (
        <li key={user.id}>{user.userName}</li>
      ))}
    </ul>
  );
}
