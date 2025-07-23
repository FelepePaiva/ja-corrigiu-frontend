import styled from "styled-components";

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  margin-bottom: 14px;
`;

const Input = (props) => <StyledInput {...props} />;

export default Input;
