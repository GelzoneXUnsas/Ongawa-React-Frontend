import { useState } from "react";

import xIcon from "../../assets/icons/x_Icon.svg";
import leftArrowIcon from "../../assets/icons/leftArrowIconLarge.svg";
import rightArrowIcon from "../../assets/icons/rightArrowIconLarge.svg";

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
  // State used to track current images
  const [galleryImages, setGalleryImages] = useState(screenArtSources);
  // State used to toggle image types displayed (either screenArt or musicCovers)
  const [activeTab, setActiveTab] = useState("screenArt");
  // State used to manage image popup
  const [selectedImage, setSelectedImage] = useState(null);
  // Function to close image popup
  const handlePopupClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedImage(null);
    }
  };

  // Selected Image navigation
  const goToNextImage = () => {
    const currentList =
      activeTab === "screenArt"
        ? screenArtSources.screenart_list
        : musicCoverSources.musiccovers_list;

    const currentIndex = currentList.findIndex(
      (img) => img.id === selectedImage.id
    );
    if (currentIndex < currentList.length - 1) {
      setSelectedImage(currentList[currentIndex + 1]);
    }
  };

  const goToPrevImage = () => {
    const currentList =
      activeTab === "screenArt"
        ? screenArtSources.screenart_list
        : musicCoverSources.musiccovers_list;

    const currentIndex = currentList.findIndex(
      (img) => img.id === selectedImage.id
    );
    if (currentIndex > 0) {
      setSelectedImage(currentList[currentIndex - 1]);
    }
  };

  // Check if navigation arrows should be disabled
  const isFirstImage = () => {
    const currentList =
      activeTab === "screenArt"
        ? screenArtSources.screenart_list
        : musicCoverSources.musiccovers_list;
    return selectedImage.id === currentList[0].id;
  };

  const isLastImage = () => {
    const currentList =
      activeTab === "screenArt"
        ? screenArtSources.screenart_list
        : musicCoverSources.musiccovers_list;
    return selectedImage.id === currentList[currentList.length - 1].id;
  };

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
      <div className="py-12 columns-2 lg:columns-5 gap-6">
        {(activeTab === "screenArt"
          ? galleryImages.screenart_list
          : galleryImages.musiccovers_list
        ).map((art) => (
          <div key={art.id} className="w-full mb-6 break-inside-avoid">
            <div className="rounded-lg overflow-hidden">
              <img
                src={art.imagePath}
                alt={art.name}
                className="w-full h-auto object-cover rounded-lg"
                onClick={() => {
                  setSelectedImage(art);
                }}
              />
            </div>
            <p className="m-0 mt-2 ml-4 font-nova-square text-white">
              {art.name}
            </p>
          </div>
        ))}
      </div>

      {/* Image Popup Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={handlePopupClick}
        >
          {/* Navigation Arrow - Left */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevImage();
            }}
            disabled={isFirstImage()}
            className={`hidden lg:block z-10 absolute left-4 lg:left-12 p-2 ${
              isFirstImage()
                ? "opacity-30 cursor-default"
                : "opacity-80 hover:opacity-100 cursor-pointer"
            }`}
          >
            <img
              src={leftArrowIcon}
              alt="Previous"
              className="h-8 w-8 lg:h-12 lg:w-12 filter brightness-0 invert"
            />
          </button>

          {/* Main Content Container */}
          <div className="w-full max-w-6xl mx-4 relative">
            {/* Header with name and close button */}
            <div className="flex justify-between items-center p-4">
              <h2 className="text-2xl lg:text-4xl font-nova-square text-white font-light">
                {selectedImage.name}
              </h2>
              <button
                onClick={() => {
                  setSelectedImage(null);
                }}
                className="text-white hover:text-accent-yellow text-4xl font-nova-square"
              >
                <img
                  className="h-4 w-4 lg:h-6 lg:w-6 filter brightness-0 invert"
                  src={xIcon}
                />
              </button>
            </div>

            {/* Image Container */}
            <div className="mx-auto p-2 w-full max-h-[50vh] flex justify-center">
              <img
                src={selectedImage.imagePath}
                alt={selectedImage.name}
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>

            {/* Description */}
            <div className="p-4">
              <p className="text-light-grey font-nova-square text-lg">
                {selectedImage.description}
              </p>
            </div>
          </div>

          {/* Navigation Arrow - Right */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNextImage();
            }}
            disabled={isLastImage()}
            className={`hidden lg:block z-10 absolute right-4 lg:right-12 p-2 ${
              isLastImage()
                ? "opacity-30 cursor-default"
                : "opacity-80 hover:opacity-100 cursor-pointer"
            }`}
          >
            <img
              src={rightArrowIcon}
              alt="Next"
              className="h-8 w-8 lg:h-12 lg:w-12 filter brightness-0 invert"
            />
          </button>
        </div>
      )}
    </div>
  );
}

export default GalleryPage;
