import artist1Image from "../assets/images/featuredArtists/artist1.jpg";
import artist2Image from "../assets/images/featuredArtists/artist2.jpg";
import artist3Image from "../assets/images/featuredArtists/artist3.png";
import albumArtImage1 from "../assets/images/musicCovers/neonpulsesymHD.png";
import albumArtImage2 from "../assets/images/musicCovers/celticwhispersballadHD.png";

export const musicians = [
  {
    id: 1,
    musicianName: "Techo Maestro",
    artistImg: artist1Image,
    totalSongs: 25,
    totalPlaycount: 538,
    description:
      "An innovative electronic music producer, Techo Maestro blends cutting-edge beats with ethereal soundscapes. Known for his dynamic live performances and genre-defying tracks, he pushes the boundaries of electronic music. His work resonates with fans of both dance and ambient genres.",
    albums: [
      {
        albumTitle: "Album Title",
        releaseDate: "March 15, 2024",
        totalPlaytime: "20:14",
        albumArt: albumArtImage1,
        tracks: [
          { name: "Neon Dreams", duration: "3:12", beatmapId: 1 },
          { name: "Neon Dreams", duration: "3:12", beatmapId: 2 },
          { name: "Neon Dreams", duration: "3:12", beatmapId: 3 },
          { name: "Neon Dreams", duration: "3:12", beatmapId: 1 },
          { name: "Neon Dreams", duration: "3:12", beatmapId: 1 },
        ],
      },
      {
        albumTitle: "Album Title 2",
        releaseDate: "March 15, 2024",
        totalPlaytime: "20:14",
        albumArt: albumArtImage1,
        tracks: [
          { name: "Neon Dreams", duration: "3:12", beatmapId: 1 },
          { name: "Neon Dreams", duration: "3:12", beatmapId: 1 },
          { name: "Neon Dreams", duration: "3:12", beatmapId: 1 },
        ],
      },
      {
        albumTitle: "Album Title 3",
        releaseDate: "March 15, 2024",
        totalPlaytime: "20:14",
        albumArt: albumArtImage1,
        tracks: [
          { name: "Neon Dreams", duration: "3:12", beatmapId: 1 },
          { name: "Neon Dreams", duration: "3:12", beatmapId: 1 },
        ],
      },
    ],
  },
  {
    id: 2,
    musicianName: "The Shadow Weaver",
    artistImg: artist2Image,
    totalSongs: 16,
    totalPlaycount: 386,
    description:
      "A master of atmospheric soundscapes, The Shadow Weaver creates hauntingly beautiful music that transports listeners to otherworldly realms. With a unique blend of electronic and organic sounds, their tracks evoke deep emotions and vivid imagery. Perfect for fans of ambient and cinematic music.",
    albums: [
      {
        albumTitle: "Album Title",
        releaseDate: "March 15, 2024",
        totalPlaytime: "20:14",
        albumArt: albumArtImage2,
        tracks: [
          { name: "Neon Dreams", duration: "3:12", beatmapId: 1 },
          { name: "Neon Dreams", duration: "3:12", beatmapId: 1 },
          { name: "Neon Dreams", duration: "3:12", beatmapId: 1 },
          { name: "Neon Dreams", duration: "3:12", beatmapId: 1 },
          { name: "Neon Dreams", duration: "3:12", beatmapId: 1 },
        ],
      },
    ],
  },
  {
    id: 3,
    musicianName: "The Sound Sorcerer",
    artistImg: artist3Image,
    totalSongs: 14,
    totalPlaycount: 479,
    description:
      "A sonic alchemist, The Sound Sorcerer blends diverse musical elements to create enchanting compositions. Their music is a fusion of electronic, world, and classical influences, resulting in a rich auditory experience. Ideal for those who appreciate intricate sound design and innovative musical storytelling.",
    albums: [],
  },
  // {
  //   id: 4,
  //   musicianName: "Techo Maestro",
  //   artistImg: artist1Image,
  //   totalSongs: 25,
  //   totalPlaycount: 538,
  //   description:
  //     "A pioneer in the electronic music scene, Techo Maestro is known for his innovative sound design and captivating live performances. His music blends elements of techno, house, and ambient, creating immersive auditory experiences. With a growing discography and a dedicated fanbase, he continues to push the boundaries of electronic music.",
  //   albums: [],
  // },
  // {
  //   id: 5,
  //   musicianName: "Techo Maestro",
  //   artistImg: artist1Image,
  //   totalSongs: 25,
  //   totalPlaycount: 538,
  //   description:
  //     "A pioneer in the electronic music scene, Techo Maestro is known for his innovative sound design and captivating live performances. His music blends elements of techno, house, and ambient, creating immersive auditory experiences. With a growing discography and a dedicated fanbase, he continues to push the boundaries of electronic music.",
  //   albums: [],
  // },
  // {
  //   id: 6,
  //   musicianName: "Techo Maestro",
  //   artistImg: artist1Image,
  //   totalSongs: 25,
  //   totalPlaycount: 538,
  //   description:
  //     "A pioneer in the electronic music scene, Techo Maestro is known for his innovative sound design and captivating live performances. His music blends elements of techno, house, and ambient, creating immersive auditory experiences. With a growing discography and a dedicated fanbase, he continues to push the boundaries of electronic music.",
  //   albums: [],
  // },
  // {
  //   id: 7,
  //   musicianName: "The Shadow Weaver",
  //   artistImg: artist2Image,
  //   totalSongs: 16,
  //   totalPlaycount: 386,
  //   description:
  //     "A pioneer in the electronic music scene, Techo Maestro is known for his innovative sound design and captivating live performances. His music blends elements of techno, house, and ambient, creating immersive auditory experiences. With a growing discography and a dedicated fanbase, he continues to push the boundaries of electronic music.",
  //   albums: [],
  // },
  // {
  //   id: 8,
  //   musicianName: "The Sound Sorcerer",
  //   artistImg: artist3Image,
  //   totalSongs: 14,
  //   totalPlaycount: 479,
  //   description:
  //     "A pioneer in the electronic music scene, Techo Maestro is known for his innovative sound design and captivating live performances. His music blends elements of techno, house, and ambient, creating immersive auditory experiences. With a growing discography and a dedicated fanbase, he continues to push the boundaries of electronic music.",
  //   albums: [],
  // },
];
