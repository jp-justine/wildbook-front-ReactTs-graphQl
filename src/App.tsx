import React, { useState } from "react";
import "./App.css";
import { IWilder } from "./interfaces";
import Wilder from "./components/Wilder";
import AddWilderForm from "./components/AddWilderForm";
import AddSkillsToWilder from "./components/AddSkillsToWilder";
import { TestProvider } from "./test.hook";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
} from "@apollo/client";
import { getWilders } from "./graphql/wilders";

function Main() {
  const { loading, data, refetch } = useQuery<{ wilders: IWilder[] }>(
    getWilders
  );

  const [selectedWilder, setSelectedWilder] = useState<IWilder | null>(null);

  return (
    <div>
      <header>
        <div className="container">
          <h1>Wilders Book</h1>
        </div>
      </header>
      <main className="container">
        <h2>Wilders</h2>
        <section className="card-row">
          {loading === true && "Chargement..."}
          {data?.wilders.map((wilder) => {
            return (
              <Wilder
                key={wilder.id}
                id={wilder.id}
                name={wilder.name}
                city={wilder.city}
                upvotes={wilder.upvotes}
                onAddSkillsClicked={function () {
                  setSelectedWilder(wilder);
                }}
              />
            );
          })}
        </section>
        {selectedWilder && (
          <AddSkillsToWilder
            wilder={selectedWilder}
            onCancelClicked={() => setSelectedWilder(null)}
            onWilderUpdated={() => refetch()}
          />
        )}
        <AddWilderForm onWilderCreated={() => refetch()} />
      </main>
      <footer>
        <div className="container">
          <p>&copy; 2022 Wild Code School</p>
        </div>
      </footer>
    </div>
  );
}

const client = new ApolloClient({
  uri: "http://localhost:5000",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <TestProvider>
      <ApolloProvider client={client}>
        <Main />
      </ApolloProvider>
    </TestProvider>
  );
}

export default App;
