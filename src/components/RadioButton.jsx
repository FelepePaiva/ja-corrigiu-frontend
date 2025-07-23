import styled from "styled-components";

const RadioLabel = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  margin-right: 20px;
  font-weight: 500;
  font-size: 16px;

  input[type="radio"] {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid #2c3e50;
    border-radius: 50%;
    margin-right: 8px;
    position: relative;
    background: #fff;
    transition: border 0.2s;

    &:checked {
      border: 6px solid #3ec9a7;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px #3ec9a744;
    }
  }

  /* Inner dot */
  input[type="radio"]:checked::after {
    content: "";
    display: block;
    width: 8px;
    height: 8px;
    background: #3ec9a7;
    border-radius: 50%;
    position: absolute;
    left: 6px;
    top: 6px;
  }

  /* For better accessibility */
  &:hover input[type="radio"] {
    border-color: #19837c;
  }
`;

const RadioOption = ({ name, value, checked, onChange, children }) => (
  <RadioLabel>
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
    />
    {children}
  </RadioLabel>
);

export default RadioOption;
