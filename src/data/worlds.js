import world1 from "../assets/images/worlds/world1.png";
import cover1 from "../assets/images/musicCovers/celticwhispersballadHD.png";

// discography could later just be an array of beatmap or song ids that artist wants in this world. depends on database structure
export const worlds = [
  {
    id: 1,
    title: "Serenity",
    artist: "Techno Maestro",
    image: world1,
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
    id: 2,
    title: "World Name",
    artist: "Artist Name",
    image: world1,
    likes: 2,
    createdAt: "2024-11-23T09:15:00Z"
  },
  {
    id: 3,
    title: "World Name",
    artist: "Artist Name",
    image: world1,
    likes: 0,
    createdAt: "2025-02-05T18:45:00Z"
  },
]