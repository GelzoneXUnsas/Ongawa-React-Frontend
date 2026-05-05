import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Hub } from 'aws-amplify/utils';
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
import WorldsPage from "./pages/WorldsPage/WorldsPage";
import WorldPage from "./pages/WorldPage/WorldPage";

import Login from "./pages/Auth/Login";
import { AuthProvider } from "./contexts/authContext";
import Register from "./pages/Auth/Register";
/*
import { getCurrentUser } from 'aws-amplify/auth';

 const user = await getCurrentUser();
console.log("User ID:", user.userId);
console.log("Username:", user.username); */

function Router() {
  const [muted, setMuted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for Google Sign-In redirect completion
    const hubListener = Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signInWithRedirect':
          navigate('/');
          break;
        case 'signInWithRedirect_failure':
          navigate('/login');
          break;
      }
    });

    return () => hubListener();
  }, [navigate]);

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
          <Route path="community/new" element={<CreatePostPage />} />
          <Route path="community/:id" element={<CommunityPostPage />} />
          <Route path="musicianlisting" element={<MusicianListingPage />} />
          <Route path="musician/:id" element={<MusicianPage />} />

          <Route path="worlds" element={<WorldsPage />} />
          <Route path="worlds/:id" element={<WorldPage />} />

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