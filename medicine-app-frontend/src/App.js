import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NavBar from './components/NavBar'
import IndexPage from './components/IndexPage'
import EditDeletePage from './components/EditDeletePage'
import AddNewPage from './components/AddNewPage';

function App() {
  
  return (
    <Router>
        <NavBar />
        <Switch>

          <Route exact path="/">
            <IndexPage />
          </Route>
          <Route exact path="/admin">
            <EditDeletePage />
          </Route>
          <Route exact path="/addnew">
            <AddNewPage />
          </Route>
    
        </Switch>
    </Router>
  );
}

export default App;
