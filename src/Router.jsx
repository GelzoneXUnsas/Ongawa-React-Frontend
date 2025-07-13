import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Homepage from "./pages/Homepage/Homepage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
//import GoogleTag from './components/GoogleTag';

import GalleryPage from "./pages/GalleryPage/GalleryPage";
import MusicanListingPage from "./pages/MusicianListing/MusicianListingPage";
import MusicianPage from "./pages/MusicianPage/MusicianPage";
import BeatmapListingPage from "./pages/BeatmapListingPage/BeatmapListingPage";
import BeatmapPage from "./pages/BeatmapPage/BeatmapPage";
// eslint-disable-next-line no-unused-vars
import CommunityPage from "./pages/CommunityPage/CommunityPage";
import ComingSoonPage from "./pages/ComingSoonPage/ComingSoonPage";

import Login from "./pages/Auth/Login";
import { AuthProvider } from "./contexts/authContext";
import Register from "./pages/Auth/Register";

function Router() {
  const [muted, setMuted] = useState(false);

  return (
    <div>
      <AuthProvider>
        <Header muted={muted} setMuted={setMuted} />
        {/* Adding h-screen hides the scrollbar, but messes w/ the scrolling */}
        {/* <div className='no-scrollbar overflow-y-auto'> */}
        <Routes>
          <Route path="/" element={<Homepage muted={muted} />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="beatmaplisting" element={<BeatmapListingPage />} />
          <Route path="musicianlisting" element={<MusicanListingPage />} />
          <Route path="musician" element={<MusicianPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="beatmaplisting/:id" element={<BeatmapPage />} />
          <Route path="comingsoon" element={<ComingSoonPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {/* </div> */}
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default Router;
