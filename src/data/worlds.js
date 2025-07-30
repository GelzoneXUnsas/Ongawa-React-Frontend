import world1 from "../assets/images/worlds/world1.png";
import cover1 from "../assets/images/musicCovers/celticwhispersballadHD.png";
import cover3 from "../assets/images/musicCovers/celestialechoesHD.png";
import artist1Image from "../../assets/images/featuredArtists/artist1.jpg";
import artist2Image from "../../assets/images/featuredArtists/artist2.jpg";

// discography could later just be an array of beatmap or song ids that artist wants in this world. depends on database structure
export const worlds = [
  {
    id: 1,
    title: "Techno Dreamscape",
    image: world1,
    artist: "Techno Maestro",
    artistImage: artist1Image,
    artistBio: "An innovative electronic music producer, Techo Maestro blends cutting-edge beats with ethereal soundscapes. Known for his dynamic live performances and genre-defying tracks, he pushes the boundaries of electronic music. His work resonates with fans of both dance and ambient genres.",
    artistQuote: "“Techno Dreamscape is my exploration of a harmonious coexistence between humanity and technology. Through gameplay, I aim to convey the symbiotic relationship between the organic and the artificial, drawing players into the beating heart of a neon-lit future. This collaboration is a personal odyssey, an auditory adventure that mirrors the fusion of man and machine that defines our collective dreams.”",
    discography: [
        {
            id: 1,
            title: "Neon Pulse Symphony",
            artist: "Techno Maestro",
            mappedBy: "Techno Maestro",
            image: cover1,
            duration: "3:47",
            bpm: "113",
            description:
              "Dive into the cutting-edge realm of Techno Adventures World, where futuristic technology meets thrilling escapades. Explore cyber landscapes, master advanced gadgets, and overcome digital challenges in this electrifying journey through the next frontier.",
            source: ["Techno", "Adventures", "World"],
            tags: ["Neon", "Synth wave"],
            likes: 0,
            plays: 0,
            downloads: 61,
            difficulties: {
              easy: {
                level: "1.5",
                hpDrain: 3,
                approachRate: 4,
                notes: "95",
                sliders: "28",
              },
              medium: {
                level: "2.3",
                hpDrain: 5,
                approachRate: 7,
                notes: "185",
                sliders: "61",
              },
              hard: {
                level: "3.8",
                hpDrain: 8,
                approachRate: 9,
                notes: "285",
                sliders: "93",
              },
            },
            createdAt: "2025-01-15T14:30:00Z"
          }, 
          // random made-up second beatmap for dev purposes
          {
            id: 2,
            title: "Neon Pulse Overdrive",
            artist: "Techno Maestro",
            mappedBy: "Techno Maestro",
            image: cover1,
            duration: "4:12",
            bpm: "128",
            description:
                "Amp up your senses with the high-octane sequel to the original symphony. In Neon Pulse Overdrive, you’re launched deeper into a cybernetic cityscape pulsing with neon life, rhythm-fueled challenges, and intense digital duels.",
            source: ["Techno", "Cyberpunk", "Arcade"],
            tags: ["Overdrive", "Hard Synth", "Futuristic"],
            likes: 0,
            plays: 10,
            downloads: 45,
            difficulties: {
                easy: {
                level: "2.0",
                hpDrain: 4,
                approachRate: 5,
                notes: "110",
                sliders: "34",
                },
                medium: {
                level: "2.8",
                hpDrain: 6,
                approachRate: 7.5,
                notes: "200",
                sliders: "70",
                },
                hard: {
                level: "4.2",
                hpDrain: 9,
                approachRate: 10,
                notes: "310",
                sliders: "102",
                },
            },
            createdAt: "2025-02-10T16:00:00Z"
            }
    ],
    likes: 5,
    createdAt: "2025-01-15T14:30:00Z"
  },
  {
    id: 1,
    title: "Serenity",
    image: world1,
    artist: "Celestial Harmonics",
    artistImage: artist2Image,
    artistBio: "Celestial Harmonics is a visionary composer known for creating immersive, meditative soundscapes that blend orchestral textures with ambient electronica. Drawing inspiration from nature, emotion, and cosmic themes, their music invites listeners on a serene auditory journey. Perfect for relaxation, reflection, and rhythmic gameplay, Celestial Harmonics brings a calming yet deeply emotive energy to the world of sound.",
    artistQuote: "“Thank you for all your support to my music and these amazing levels!”",
    discography: [
        {
            id: 3,
            title: "Celestial Echoes",
            artist: "Celestial Harmonics",
            mappedBy: "StarNavigator",
            image: cover3,
            duration: "5:23",  //
            bpm: "113", //
            description:
                "Float through the cosmos with this ethereal symphony that captures the harmony of the stars. Each beat resonates with the pulse of distant galaxies, creating a celestial journey that will transport you beyond the boundaries of our universe.",
            source: ["Astronomical", "Ambient", "Space"],
            tags: ["Cosmic", "Ambient", "Ethereal"],
            likes: 0,
            plays: 1,
            downloads: 87,
            difficulties: {
                easy: {
                level: "1.8",
                hpDrain: 3,  //
                approachRate: 4,
                notes: "110",
                sliders: "42",
                },
                medium: {
                level: "2.5",
                hpDrain: 5,
                approachRate: 6,
                notes: "167",
                sliders: "72",
                },
                hard: {
                level: "3.5",
                hpDrain: 7,
                approachRate: 8,
                notes: "245",
                sliders: "105",
                },
            },
            createdAt: "2025-02-05T18:45:00Z"
            },
    ],
    likes: 2,
    createdAt: "2024-11-23T09:15:00Z"
  },
  {
    id: 3,
    title: "World Name",
    image: world1,
    artist: "Artist Name",
    artistImage: artist2Image,
    artistBio: "[Insert Bio Here]",
    artistQuote: "[Insert Quote Here]",
    discography: [],
    likes: 0,
    createdAt: "2025-02-05T18:45:00Z"
  },
]