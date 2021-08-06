import "./App.css";
import { TableComponent } from "./components/Table/Table";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { CanvasStarsComponent } from "./components/CanvasStars/CanvasStars";

function App() {
  console.log("render App");
  return (
    <Router>
      <main>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/table">Table</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/table">
            <TableComponent />
          </Route>

          <Route path="/">
            <CanvasStarsComponent></CanvasStarsComponent>
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
