import "./App.css";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import Home from "./components/blog/Home";
import Blog from "./components/blog/Blog";
import SignUp from "./components/user/SignUp";
import SignIn from "./components/user/SignIn";
import NotFound from "./components/NotFound";
import { AuthProvider } from "./services/Auth";
import { PrivateRoute } from "./components/PrivateRoute";
import Landing from "./components/Landing";
import CreateBlog from "./components/blog/CreateBlog";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EditBlog from "./components/blog/EditBlog";

const theme = createTheme({
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
});

function App() {
  const { id } = useParams();
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <div className="App">
            <Navbar />
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <PrivateRoute>
                    <Landing />
                  </PrivateRoute>
                }
              />
              <Route exact path="/login" element={<SignIn />} />
              <Route exact path="/register" element={<SignUp />} />
              <Route
                exact
                path="/home"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/blog/get/:id"
                element={
                  <PrivateRoute>
                    <Blog />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/blog/edit/:id"
                element={
                  <PrivateRoute>
                    <EditBlog />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/blog/new"
                element={
                  <PrivateRoute>
                    <CreateBlog />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
