import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";

import Homepage from "./pages/Homepage/Homepage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
//import GoogleTag from './components/GoogleTag';

import GalleryPage from "./pages/GalleryPage/GalleryPage";
import MusicianListingPage from "./pages/MusicianListing/MusicianListingPage";
import MusicianPage from "./pages/MusicianPage/MusicianPage";
import BeatmapListingPage from "./pages/BeatmapListingPage/BeatmapListingPage";
import BeatmapPage from "./pages/BeatmapPage/BeatmapPage";
// eslint-disable-next-line no-unused-vars
import CommunityPage from "./pages/CommunityPage/CommunityPage";
import CommunityPostPage from "./pages/CommunityPostPage/CommunityPostPage";
import CreatePostPage from "./pages/CreatePostPage/CreatePostPage";
import ComingSoonPage from "./pages/ComingSoonPage/ComingSoonPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

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
          <Route path="community" element={<CommunityPage />} />
          <Route path="community/:id" element={<CommunityPostPage />} />
          <Route path="community/new" element={<CreatePostPage />} />

          <Route path="musicianlisting" element={<MusicianListingPage />} />
          <Route path="musician/:id" element={<MusicianPage />} />

          <Route path="beatmaplisting/:id" element={<BeatmapPage />} />

          <Route path="comingsoon" element={<ComingSoonPage />} />

          <Route path="user/:id" element={<ProfilePage />} />
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
