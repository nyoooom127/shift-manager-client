import styled, { css } from "styled-components";

interface StyledFormProps {
  $login?: boolean;
  $userFilterForm?: boolean;
  $userSettings?: boolean;
}

const StyledForm = styled.form.attrs(() => ({
  className: "StyledForm",
}))<StyledFormProps>`
  width: 400px;
  margin: 20px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: right;
  direction: rtl;
  align-items: start;

  ${(props) =>
    props.$login &&
    css`
      width: 250px;
      border: 1px solid;
      margin-top: 10rem;
      border-radius: 10px;
      box-shadow: 10px 10px 10px;
      display: grid;
      height: fit-content;

      button {
        width: 100%;
      }
    `}

  ${(props) =>
    (props.$userFilterForm ||
      props.$userSettings) &&
    css`
      margin: 0px auto;
      align-content: center;
      align-items: center;
    `}

  input,
  button {
    font-size: larger;
  }

  .Buttons {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin-top: 2rem;
  }

  ${(props) =>
    props.$userSettings &&
    css`
      overflow: auto;
      height: 100%;
      width: unset;

      .Buttons {
        justify-content: center;
        gap: 3rem;
      }
    `}

  h2 {
    text-align: center;
  }

  .FormBody {
    display: flex;
    flex-direction: row;
    direction: rtl;
    width: 100%;
    justify-content: space-evenly;
    gap: 2rem;
  }

  .FormColumn {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 90%;
    align-items: center;
  }

  .FormRow {
    display: flex;
    gap: 1rem;
  }

  .CheckBoxWrapper {
    display: grid;
    column-gap: 50px;
    row-gap: 20px;
    grid-template-columns: auto auto;
  }
`;

export default StyledForm;
