import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Singup";

function App() {
  return (
    <Router>
      <AuthProvider>
          <Switch>
            <Route exact path="/" component={Signup} />
            <Route exact path="/login" component={Login} />
          </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
