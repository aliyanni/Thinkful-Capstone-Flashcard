import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import ListOfDecks from "../deck/ListOfDecks";
import CreateDeck from "../deck/CreateDeck";
import StudyPage from "../study/StudyPage";
import DeckInfo from "../deck/DeckInfo";
import EditDeck from "../deck/EditDeck";
import CardForm from "../card/CardForm";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
      </div>
      <Switch>
        <Route exact path="/">
          <ListOfDecks />
        </Route>
        <Route path="/decks/new">
          <CreateDeck />
        </Route>
        <Route path="/decks/:deckId/study">
          <StudyPage />
        </Route>
        <Route path="/decks/:deckId/cards/new">
          <CardForm />
        </Route>
        <Route path="/decks/:deckId/cards/:cardId/edit">
          <CardForm isEdit={true} />
        </Route>
        <Route path="/decks/:deckId/edit">
          <EditDeck />
        </Route>
        <Route path="/decks/:deckId">
          <DeckInfo />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default Layout;
