import React from "react";
import styled from "styled-components";
import { useTest } from "../test.hook";

const Circle = styled.span<{ upvotes: number; withMargins?: boolean }>`
  /* Center the content */
  align-items: center;
  display: flex;
  justify-content: center;

  /* Colors */
  background-color: ${(props) => (props.upvotes > 20 ? "green" : "red")};
  color: #fff;

  /* Rounded border */
  border-radius: 9999px;
  height: 20px;
  width: 20px;
  margin-left: ${(props) => (props.withMargins ? "8px" : "0px")};
`;

interface IProps {
  name: string;
  upvotes: number;
}

function Skill(props: IProps): JSX.Element {
  const { someData } = useTest();

  return (
    <li>
      {props.name} {someData}
      <Circle upvotes={props.upvotes} withMargins={true}>
        {props.upvotes}
      </Circle>
    </li>
  );
}

export default Skill;
