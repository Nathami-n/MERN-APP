import { Route, Routes } from "react-router-dom";
import { Home, SignIn, SignUp, Profile, About, Protected } from "./pages";
import { Header } from "./components";

const App = () => {
  return (
    <main className="bg-[#fafbfc]">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route element={<Protected />}>
          <Route exact path="/profile" element={<Profile />} />
        </Route>

        <Route exact path="/sign-in" element={<SignIn />} />
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route exact path="/about" element={<About />} />
      </Routes>
    </main>
  );
};

export default App;
