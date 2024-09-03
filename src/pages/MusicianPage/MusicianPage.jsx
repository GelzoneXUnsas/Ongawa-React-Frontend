import { useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Import the back arrow icon
import headerBackgroundImg from '../../assets/images/headerBackground.png';

//images for beatmap covers 
import cover1 from '../../assets/images/musicCovers/celticwhispersballadHD.png';
import cover2 from '../../assets/images/musicCovers/neonpulsesymHD.png';
import cover3 from '../../assets/images/musicCovers/celestialechoesHD.png';
import cover4 from '../../assets/images/musicCovers/nocturnalpursuitHD.png';

//images for artists
import artist2Image from "../../assets/images/featuredArtists/artist2.jpg";
import artist1Image from "../../assets/images/featuredArtists/artist1.jpg";
import artist3Image from "../../assets/images/featuredArtists/artist3.png";

import { FaInstagram } from "react-icons/fa6";
import { FaSpotify } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaSoundcloud } from "react-icons/fa";


const albumCovers = {'cover1': cover1, 'cover2': cover2, 'cover3': cover3, 'cover4': cover4};
const artistImages = {'artist1Image': artist1Image, 'artist2Image': artist2Image, 'artist3Image': artist3Image};




const MusicianPage = () => {
  
  const musician_list = {
    musician_info: 
        [
          {
          id : 1,
          musicianName : 'Techo Maestro',
          artistImg: 'artist1Image',
          totalSongs: 25,
          totalPlaycount: 538,
          bio: 'An innovative electronic music producer, Techo Maestro blends cutting-edge beats with ethereal soundscapes. Known for his dynamic live performances and genre-defying tracks, he pushes the boundaries of electronic music. His work resonates with fans of both dance and ambient genres.',
          },
            {
                id : 2,
                musicianName : 'The Shadow Weaver',
                artistImg: 'artist2Image',
                totalSongs: 16,
                totalPlaycount: 386,
                bio: "The Shadow Weaver is a musician who creates music that is inspired by the stories and legends of old. Their music is a blend of traditional folk melodies and modern electronic sounds. Folklore Minstrel's music is known for its haunting melodies, lush harmonies, and intricate rhythms. Their music is perfect for fans of fantasy, adventure, and magic.",
            },
            
            {
                id : 3,
                musicianName : 'The Sound Sorcerer',
                artistImg: 'artist3Image',
                totalSongs: 14,
                totalPlaycount: 479,
                bio: "The Sound Sorcerer is a visionary composer who merges classical orchestration with cosmic soundscapes. Renowned for creating immersive and cinematic music, their compositions evoke deep emotional responses and transport listeners to otherworldly realms. Their work is celebrated for its unique fusion of traditional and modern elements.",
            },
        ]
  }
  
  
  const discography_list = {
    discography_info: 
        [
            {
                id : 1,
                musicianName : 'The Shadow Weaver',
                musicianID: 2,
                albumImage: 'cover1',
                albumName: 'Stellar Reverberations',
                releaseDate: '2/19/2024',
                totalPlaytime: '18:02',
                songs: {"Celestial Echoes": "2:43",
  "Orbiting Solitude": "3:51",
  "Galactic Serenade": "2:18",
  "Aurora’s Lament": "3:43",
  "Nebula’s Whisper": "5:27"}
            },
            {
              id: 3,
              musicianName: 'Celestial Harmonics',
              musicianID: 3,
              albumImage: 'cover2',
              albumName: 'Ethereal Realms',
              releaseDate: '4/10/2024',
              totalPlaytime: '22:30',
              songs: {
                "Luminous Voyage": "4:05",
                "Nebula Drift": "3:45",
                "Starlit Dreams": "3:20",
                "Cosmic Serenade": "4:15",
                "Celestial Dawn": "7:05"
              }
            },
            {
              id: 2,
              musicianName: 'Techo Maestro',
              musicianID: 1,
              albumImage: 'cover3',
              albumName: 'Digital Pulse',
              releaseDate: '3/15/2024',
              totalPlaytime: '20:15',
              songs: {
                "Neon Dreams": "3:12",
                "Quantum Beat": "4:05",
                "Electro Mirage": "2:50",
                "Cyber Groove": "3:40",
                "Virtual Sunrise": "6:28"
              }
            }
            


        ]
  }


  const navigate = useNavigate();
  const [musician, setMusician] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [discography, setDiscography] = useState([]);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  console.log('ID', id);
  async function fetchAll() {
      try {
          /*
          const route = BACKEND_URL + `/beatmapListing?id=${id}`;
          const response = await axios.get(route);
          */
          const response = musician_list;
          console.log(response.data.musician_info[0]);
          return response.data.musician_info;
      }
      catch (error) {
          console.log(error);
          return musician_list.musician_info;
      }
  }

  useEffect(() => {
      fetchAll().then(result => {
          console.log('RESULT', result);
          if (result && result.length > 0)
            setMusician(result[0]);
          setDiscography(result);
              console.log('musican', musician);
              if (musician.length < 1) {
                setMusician(musician_list.musician_info[id-1]);
                  console.log('done');
              }
      });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBackClick = () => {
      navigate(-1); // Go back to the previous page
  };

  
  const ArtistInfo = () => {
    return (
      <section className="flex flex-col items-center text-center p-4 text-white">
        <img
          src={artistImages[musician.artistImg]}
          alt="Artist"
          className="w-32 h-32 mb-4 rounded-full"
        />
        <h2 className="text-2xl font-bold">{musician.musicianName}</h2>
        <div className="flex justify-center items-center space-x-4 text-[#D5A6ED] mt-2">
          <span>{musician.totalSongs} songs</span>
          <span>•</span>
          <span>{musician.totalPlaycount} total playcount</span>
        </div>
        <div className="flex justify-center space-x-6 mt-6">
          <a
            href="https://instagram.com"
            className="text-white hover:text-gray-300 focus:text-gray-300 transition-colors duration-300"
            aria-label="Instagram"
          >
            <FaInstagram className="text-4xl sm:text-2xl md:text-3xl lg:text-5xl" />
          </a>
          <a
            href="https://x.com"
            className="text-white hover:text-gray-300 focus:text-gray-300 transition-colors duration-300"
            aria-label="X"
          >
            <FaSpotify className="text-4xl sm:text-2xl md:text-3xl lg:text-5xl" />
          </a>
          <a
            href="https://spotify.com"
            className="text-white hover:text-gray-300 focus:text-gray-300 transition-colors duration-300"
            aria-label="Spotify"
          >
            <FaXTwitter className="text-4xl sm:text-2xl md:text-3xl lg:text-5xl" />
          </a>
          <a
            href="https://soundcloud.com"
            className="text-white hover:text-gray-300 focus:text-gray-300 transition-colors duration-300"
            aria-label="SoundCloud"
          >
            <FaSoundcloud className="text-4xl sm:text-2xl md:text-3xl lg:text-5xl" />
          </a>
        </div>
        <p className="mt-4 px-4 text-gray-300">{musician.bio}</p>
      </section>
    );
  };
  
  
  
 const Discography = ({ musicianID }) => {
  // Filter albums by the specified musician ID
  const filteredAlbums = discography_list.discography_info.filter(
    album => album.musicianID === musicianID
  );

  
  return (
    <section className="p-4">
  <h3 className="text-xl font-bold text-white mb-4">Discography</h3>
  {filteredAlbums.map((album, index) => (
    <div
      key={album.id}
      className={`p-4 rounded-lg mb-6 md:flex md:items-center ${
        index === 0 ? 'bg-discography-gradient' : 'bg-discography-background'
      }`}
    >
      <img
        src={albumCovers[album.albumImage]}
        alt={album.albumName}
        className="w-40 h-40 mb-4 rounded-lg md:w-48 md:h-48 lg:w-64 lg:h-64 md:mb-0 md:mr-6 mx-auto md:mx-0"
        />
      <div className="flex-1 md:ml-4">
        <h4 className="text-lg font-bold text-white mb-2">{album.albumName}</h4>
        <p className="text-white">
          Released: <span className="text-[#ae87c2]">{album.releaseDate}</span>
        </p>
        <p className="text-white">
          Total Playtime: <span className="text-[#ae87c2]">{album.totalPlaytime}</span>
        </p>
      </div>

      <ul className="w-full mt-4 md:mt-0">
        {Object.entries(album.songs).map(([songName, duration]) => (
          <li
            key={songName}
            className="flex justify-between p-2 mb-2 bg-[#232323] rounded-lg text-white"
          >
            <span>{songName}</span>
            <span>{duration}</span>
          </li>
        ))}
      </ul>
    </div>
  ))}
</section>
  );
};

  


  return (
    <div className="w-full flex flex-col bg-page-accent-gray text-center text-body-overpass-base text-white font-body-overpass">
            <div className="titleContainer relative h-[12rem] z-0 overflow-hidden">
                <div className="bgImgContainer w-full lg:-mt-64">
                    <img src={headerBackgroundImg} className="headerBackgroundImg w-full relative object-cover" alt="" />
                </div>
                <div className="absolute w-full h-12 top-32 bottom-0 z-3 flex justify-center text-center font-title-lexend text-3xl font-bold">MUSICIAN</div>
                <div className="gradientOverlay absolute bottom-0 w-full h-[70%] bg-gradient-overlay z-1"></div>
            </div>

            <div className="backArrowContainer flex ">
                <button onClick={handleBackClick} className="self-start flex gap-1 hover:underline text-lilac text-font-size-xs items-center hover:text-gray-300 hover:border-none bg-transparent border-none">
                    <FaArrowLeft size={20} />
                    Back
                </button>
            </div>
      <ArtistInfo />
      <Discography musicianID={musician.id}/>
    </div>    
  )
};




export default MusicianPage;