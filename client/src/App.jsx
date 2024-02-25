import { Route, Routes } from "react-router-dom";
import { Home, SignIn, SignUp, Profile, About } from "./pages";

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/sign-in" element={<SignIn />} />
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route exact path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
