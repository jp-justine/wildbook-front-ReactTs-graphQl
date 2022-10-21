import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";

interface IProps {
  onWilderCreated: () => void;
}

const CREATE_WILDER = gql`
  mutation CreateWilder($data: WilderInput!) {
    createWilder(data: $data) {
      id
    }
  }
`;

function AddWilderForm(props: IProps) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const [doCreate] = useMutation(CREATE_WILDER);

  async function onSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();

    // send to GraphQL
    await doCreate({
      variables: {
        data: {
          name,
          city,
        },
      },
    });

    setName("");
    setCity("");

    props.onWilderCreated();
  }

  return (
    <>
      <h2>Ajouter un wilder</h2>
      <form>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        ></input>
        <button type="submit" onClick={onSubmit}>
          Ajouter
        </button>
      </form>
    </>
  );
}

export default AddWilderForm;
