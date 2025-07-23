// src/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 220px;
  background: #232946;
  color: #fff;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 24px;
`;

const SidebarLink = styled(Link)`
  color: #fff;
  padding: 16px 24px;
  text-decoration: none;
  font-weight: 600;
  background: ${({ $active }) => ($active ? "#121629" : "inherit")};
  transition: background 0.2s;

  &:hover {
    background: #33415c;
  }
`;

const Sidebar = ({ tipo }) => {
  const { pathname } = useLocation();

  const isProfessor = tipo === "professor";

  return (
    <SidebarContainer>
      {isProfessor ? (
        <>
          <SidebarLink to="/teacher/provas" $active={pathname === "/teacher/provas"}>
            Provas
          </SidebarLink>
          <SidebarLink to="/teacher/turmas" $active={pathname === "/teacher/turmas"}>
            Turmas
          </SidebarLink>
          <SidebarLink to="/teacher/perfil" $active={pathname === "/teacher/perfil"}>
            Perfil
          </SidebarLink>
        </>
      ) : (
        <>
          <SidebarLink to="/admin/professores" $active={pathname === "/admin/professores"}>
            Professores
          </SidebarLink>
          <SidebarLink to="/admin/alunos" $active={pathname === "/admin/alunos"}>
            Alunos
          </SidebarLink>
          <SidebarLink to="/admin/exames" $active={pathname === "/admin/exames"}>
            Provas
          </SidebarLink>
        </>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
