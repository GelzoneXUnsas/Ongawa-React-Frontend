import { useState } from "react";

function GalleryPage() {
  const screenArtSources = {
    screenart_list: [
      {
        id: 1,
        name: "art1",
        artType: "screenart",
        imagePath: "../src/assets/images/galleryArt/art1.png",
        description: "Test Description",
        dateAdded: "2024-05-18",
      },
      {
        id: 2,
        name: "art2",
        artType: "screenart",
        imagePath: "../src/assets/images/galleryArt/art2.png",
        description: "Test Description2",
        dateAdded: "2024-05-11",
      },
      {
        id: 3,
        name: "art3",
        artType: "screenart",
        imagePath: "../src/assets/images/galleryArt/art3.png",
        description: "Test Description",
        dateAdded: "2024-05-18",
      },
      {
        id: 4,
        name: "art4",
        artType: "screenart",
        imagePath: "../src/assets/images/galleryArt/art4.png",
        description: "Test Description",
        dateAdded: "2024-05-18",
      },
      {
        id: 5,
        name: "art5",
        artType: "screenart",
        imagePath: "../src/assets/images/galleryArt/art5.png",
        description: "Test Description",
        dateAdded: "2024-05-18",
      },
      {
        id: 6,
        name: "art6",
        artType: "screenart",
        imagePath: "../src/assets/images/galleryArt/art6.png",
        description: "Test Description",
        dateAdded: "2024-05-18",
      },
      {
        id: 7,
        name: "art7",
        artType: "screenart",
        imagePath: "../src/assets/images/galleryArt/art7.png",
        description: "Test Description",
        dateAdded: "2024-05-18",
      },
      {
        id: 8,
        name: "art8",
        artType: "screenart",
        imagePath: "../src/assets/images/galleryArt/art8.png",
        description: "Test Description",
        dateAdded: "2024-05-18",
      },
    ],
  };
  const musicCoverSources = {
    musiccovers_list: [
      {
        id: 1,
        name: "Celestial Echoes",
        artType: "musiccovers",
        imagePath: "../src/assets/images/musicCovers/celestialechoes.png",
        description: "Test Description3",
        dateAdded: "2024-05-11",
      },
      {
        id: 2,
        name: "Celtic Whispers Ballad",
        artType: "musiccovers",
        imagePath: "../src/assets/images/musicCovers/celticwhispersballad.png",
        description: "Test Description3",
        dateAdded: "2024-05-11",
      },
      {
        id: 3,
        name: "Neon Pulse Sym",
        artType: "musiccovers",
        imagePath: "../src/assets/images/musicCovers/neonpulsesym.png",
        description: "Test Description3",
        dateAdded: "2024-05-11",
      },
      {
        id: 4,
        name: "Nocturnal Pursuit",
        artType: "musiccovers",
        imagePath: "../src/assets/images/musicCovers/nocturnalpursuit.png",
        description: "Test Description3",
        dateAdded: "2024-05-11",
      },
    ],
  };
  const [galleryImages, setGalleryImages] = useState(screenArtSources);
  const [activeTab, setActiveTab] = useState("screenArt");

  // TODO: Fetch art sources from backend

  return (
    <div className="bg-page-background-purple-dark min-h-svh pt-24 px-8 lg:px-12">
      {/* Title */}
      <h1 className="font-nova-square text-5xl text-light-grey font-normal">
        Art Gallery
      </h1>

      {/* Art Toggle */}
      <div className="mt-12 flex justify-around">
        <button
          onClick={() => {
            setActiveTab("screenArt");
            setGalleryImages(screenArtSources);
          }}
          className={`font-nova-square text-2xl font-normal transition-all ${
            activeTab === "screenArt"
              ? "text-accent-yellow underline"
              : "text-light-grey "
          }`}
        >
          Screen Art
        </button>
        <button
          onClick={() => {
            setActiveTab("musicCovers");
            setGalleryImages(musicCoverSources);
          }}
          className={`font-nova-square text-2xl font-normal transition-all ${
            activeTab === "musicCovers"
              ? "text-accent-yellow underline"
              : "text-light-grey"
          }`}
        >
          Music Covers
        </button>
      </div>

      {/* Decorative Line */}
      <div className="mt-2 w-full border-t-[1px] border-off-white" />

      {/* Images Grid */}
      <div className="py-12 grid grid-cols-2 lg:grid-cols-5 gap-6">
        {(activeTab === "screenArt"
          ? galleryImages.screenart_list
          : galleryImages.musiccovers_list
        ).map((art) => (
          <div key={art.id} className="w-full overflow-hidden rounded-lg">
            <img
              src={art.imagePath}
              alt={art.name}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GalleryPage;
