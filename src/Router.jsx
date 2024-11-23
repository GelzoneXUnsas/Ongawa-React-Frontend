import { Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';
import Homepage from './pages/Homepage/Homepage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import GalleryPage from './pages/GalleryPage/GalleryPage';
import MusicGalleryPage from './pages/GalleryPage/MusicGalleryPage';
import MusicanListingPage from './pages/MusicianListing/MusicianListingPage';
import MusicianPage from './pages/MusicianPage/MusicianPage';
import BeatmapListingPage from './pages/BeatmapListingPage/BeatmapListingPage';
import BeatmapPage from './pages/BeatmapPage/BeatmapPage';
// eslint-disable-next-line no-unused-vars
import CommunityPage from './pages/CommunityPage/CommunityPage';
import ComingSoonPage from './pages/ComingSoonPage/ComingSoonPage';

import Login from './pages/Auth/Login';
import { AuthProvider } from './contexts/authContext';
import Register from './pages/Auth/Register';

function Router() {
    return (
        <div>
            <AuthProvider>
                <Header />
                {/* Adding h-screen hides the scrollbar, but messes w/ the scrolling */}
                {/* <div className='no-scrollbar overflow-y-auto'> */}
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="gallery" element={<GalleryPage />} />
                        <Route path="musicgallery" element={<MusicGalleryPage />} />
                        <Route path="beatmaplisting" element={<BeatmapListingPage />} />
                        <Route path="musicianlisting" element={<MusicanListingPage />} />
                        <Route path="musician" element={<MusicianPage />} />
                        <Route path="beatmap" element={<BeatmapPage />} />
                        <Route path="community" element={<ComingSoonPage />} />
                        <Route path="comingsoon" element={<ComingSoonPage />} />
                        <Route path="login" element={<Login />} />
                        <Route path='register' element={<Register />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                {/* </div> */}
                <Footer />
            </AuthProvider>
        </div>
    );
}

export default Router;