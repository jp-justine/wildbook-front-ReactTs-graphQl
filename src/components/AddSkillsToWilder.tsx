import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { ISkill, IWilder } from "../interfaces";

interface IProps {
  wilder: IWilder;
  onCancelClicked: () => void;
  onWilderUpdated: () => void;
}

const CREATE_UPVOTES = gql`
  mutation createUpvotes($skillsIds: [ID!]!, $wilderId: ID!) {
    createUpvotes(skillsIds: $skillId, wilderId: $wilderId) {
      id
    }
  }
`;

const GET_SKILLS = gql`
  query getSkills {
    skills {
      id
      name
    }
  }
`;

function AddSkillsToWilder(props: IProps) {
  const { data } = useQuery<{ skills: ISkill[] }>(GET_SKILLS);

  const [wilderSkills, setWilderSkills] = useState<number[]>([]);

  const [doCreateUpvotes] = useMutation(CREATE_UPVOTES);

  function addSkillToWilder() {
    if (data) {
      wilderSkills.push(data.skills[0].id);
      const newArray = wilderSkills.slice();
      setWilderSkills(newArray);
    }
  }

  async function onSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    await doCreateUpvotes({
      variables: {
        wilderId: props.wilder.id,
        skillId: wilderSkills,
      },
    });
    props.onCancelClicked();
    props.onWilderUpdated();
  }

  return (
    <>
      <h2>Ajouter des skills sur {props.wilder.name}</h2>
      <form onSubmit={onSubmit}>
        {wilderSkills.map((wilderSkill, index) => (
          <>
            <select
              onChange={(e) => {
                wilderSkills[index] = Number(e.target.value);
                setWilderSkills(wilderSkills.slice());
              }}
            >
              {data?.skills.map((skill: any) => (
                <option value={skill.id}>{skill.name}</option>
              ))}
            </select>
            <br />
          </>
        ))}
      </form>
      <br />
      <button type="submit" onClick={onSubmit}>
        GO!
      </button>
      <br />
      <button
        onClick={() => {
          addSkillToWilder();
        }}
      >
        Ajouter un skill
      </button>
      <br />
      <button
        onClick={() => {
          props.onCancelClicked();
        }}
      >
        Annuler
      </button>
    </>
  );
}

export default AddSkillsToWilder;
