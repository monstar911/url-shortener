import { Routes, Route } from "react-router-dom";
import AuthContainer from "./containers/AuthContainer";
import UrlShortenerContainer from "./containers/UrlShortenerContainer";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthContainer />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <UrlShortenerContainer />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
