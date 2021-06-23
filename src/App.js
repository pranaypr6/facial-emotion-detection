import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RealtimeRecognition from "./components/RealtimeRecognition";
import PhotoRecognition from "./components/PhotoRecognition";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Home from "./components/Home";

const App = () => {
  const a = () => {
    console.log("hello");
  };
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path="/realtime" component={RealtimeRecognition} exact={true} />
        <Route path="/withphoto" component={PhotoRecognition} exact={true} />
      </Switch>
    </Router>
  );
};

export default App;
