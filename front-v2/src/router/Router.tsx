import React from "react";
import { BrowserRouter as ReactRouter, Switch, Route } from "react-router-dom";
import { Home } from "../components/pages/Home";
import { Search } from "../components/pages/Search";
import { SelectSynonyms } from "../components/pages/SelectSynonyms";
import { SelectAdjectiveTopics } from "../components/pages/SelectAdjectiveTopics";
import { SelectNounTopics } from "../components/pages/SelectNounTopics";
import { SelectBooks } from "../components/pages/SelectBooks";
import { EvaluationSystem } from "../components/pages/EvaluationSystem";
import { End } from "../components/pages/End";

const Router: React.FunctionComponent = () => {
  return (
    <ReactRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/selectSynonyms" component={SelectSynonyms} />
        <Route
          exact
          path="/selectAdjectiveTopics"
          component={SelectAdjectiveTopics}
        />
        <Route exact path="/selectNounTopics" component={SelectNounTopics} />
        <Route exact path="/selectBooks" component={SelectBooks} />
        <Route exact path="/evaluationSystem" component={EvaluationSystem} />
        <Route exact path="/end" component={End} />
      </Switch>
    </ReactRouter>
  );
};

export { Router };