import { useEffect, useState } from "react";
import "./App.css";
import Profile from "./components/Profile/Profile";
import Typography from "./components/TypographyComponent";
import type { User } from "./types/User";
import "./components/Profile/Profile.css";

function App() {
  const [users, setUsers] = useState([] as User[]);

  const createUser = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    const usersData: User[] = data.map((user: any) => ({
      name: user.name,
      role: user.company.bs,
      avatarUrl: `https://ui-avatars.com/api/?name=${user.name}&size=250`,
    }));
    setUsers(usersData);
  };

  useEffect(() => {
    createUser();
  }, []);

  return (
    <Typography
      variant={"div"}
      style={{
        display: "grid",
        gap: "20px",
        marginTop: "20px",
        justifyItems: "center",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      }}
    >
      {users.map((user, index) => (
        <Profile
          name={user.name}
          role={user.role}
          avatarUrl={user.avatarUrl}
          className="profile"
          key={index}
        />
      ))}
    </Typography>
  );
}

export default App;
