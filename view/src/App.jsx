import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Booking from "./pages/Turf/Booking";
import Academy from "./pages/Academy/Academy";
import Competition from "./pages/Competiton/Competition";
import AcademyDetail from "./pages/Academy/AcademyDetail";
import TurfList from "./pages/Turf/Turf";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Singup";
import CompetitionDetail from "./pages/Competiton/CompetitionDetail";
import RecommendedCompetitions from "./pages/Competiton/RecommendedCompetitions";
import Footer from "./components/Footer/Footer";
import Admin from "./pages/Admin/Admin";
import RegistrationForm from "./pages/Home/RegisterOnOurWebsite";
//import CreateClubForm from "./pages/Academy/CreateClubForm";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="turf" element={<TurfList />} />
        <Route path="turf/:id" element={<TurfList />} />
        <Route path="academy" element={<Academy />} />
        {/* <Route path="/createClub" element={<CreateClubForm />} /> */}
        <Route path="academy/:id" element={<AcademyDetail />} />

        <Route path="competition" element={<Competition />} />
        <Route path="competition/:id" element={<CompetitionDetail />} />
        <Route path="recomendcomp" element={<RecommendedCompetitions />} />
        <Route path="admin" element={<Admin />} />
        <Route path="registerToourWebsite" element={<RegistrationForm />} />

        <Route path="booking" element={<Booking />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
