import React, { useEffect } from "react";
import { IWilder } from "../interfaces";
import blank_profile from "./../assets/blank_profile.png";
import Skill from "./Skill";
import styled from "styled-components";

const Title = styled.h4`
  color: purple;
`;

function Wilder(
  props: IWilder & { onAddSkillsClicked: () => void }
): JSX.Element {
  useEffect(() => {
    console.log("Wilder has been rerendered");
  });

  return (
    <article className="card">
      <img src={blank_profile} alt={`${props.name} Profile`} />
      <h3>{props.name}</h3>
      <h5>{props.city}</h5>
      <p>Lorem ipsum</p>
      <Title>Wild Skills</Title>
      <ul className="skills">
        {props.upvotes.map((upvote) => {
          return (
            <Skill
              key={upvote.id}
              name={upvote.skill.name}
              upvotes={upvote.upvotes}
            />
          );
        })}
      </ul>
      <button onClick={props.onAddSkillsClicked}>Add skills</button>
    </article>
  );
}

export default Wilder;
