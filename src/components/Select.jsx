import styled from "styled-components";

const StyledSelect = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  margin-bottom: 14px;
`;

const Select = (props) => <StyledSelect {...props} />;

export default Select;
