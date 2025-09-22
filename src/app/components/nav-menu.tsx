import Button from "@mui/material/Button";
import PositionedMenu from "./ui/Menu";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function NavMenu() {
  const [token, setToken] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/auth");
  };

  return (
    <div className="gap-10 flex">
      <PositionedMenu />
      {token ? (
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button variant="contained" color="success" onClick={handleLogin}>
          Login
        </Button>
      )}
    </div>
  );
}
