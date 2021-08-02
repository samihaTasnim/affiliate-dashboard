import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createContext, useState } from "react";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";

export const NameContext = createContext()

function App() {

  const [user, setUser] = useState('')

  return (
    <NameContext.Provider value={[user, setUser]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Dashboard></Dashboard>
          </Route>
          <Route path="/dashboard">
            <Dashboard></Dashboard>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
        </Switch>
      </Router>
    </NameContext.Provider>
  );
}

export default App;