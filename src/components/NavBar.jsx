import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Bar = styled.header`
  width: 100%;
  background-color: #2c3e50;
  padding: 12px 24px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const UserInfo = styled.div`
  font-size: 14px;
`;

const LogoutButton = styled.button`
  padding: 6px 12px;
  background-color: #e74c3c;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #c0392b;
  }
`;

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <Bar>
      <UserInfo>
        {user.name} — <strong>{user.role}</strong>
      </UserInfo>
      {<LogoutButton onClick={handleLogout}>Sair</LogoutButton>}
    </Bar>
  );
};

export default Navbar;
