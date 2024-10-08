// import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// import styles from "./BeatmapPage.module.css";
// import homeStyles from "../Homepage/Homepage.module.css";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Import the back arrow icon
//import axios from "axios";

import headerBackgroundImg from '../../assets/images/headerBackground.png';


import durationIcon from '../../assets/icons/durationicon.svg';
import bpmIcon from '../../assets/icons/bpmIcon.svg';
import noteCountIcon from '../../assets/icons/notecountIcon.svg';
import sliderCountIcon from '../../assets/icons/bm-slider-icon.svg';
import bm30ValueBar from '../../assets/icons/bm-fill-bar-30.svg';
import bmDifficultyBar from '../../assets/icons/bm-difficultyBar.svg';

import playIcon from '../../assets/icons/playIcon.svg';
import heartIcon from '../../assets/icons/heartIcon.svg';
import verifiedIcon from "../../assets/icons/verifiedIcon.svg";
import easyIcon from "../../assets/icons/bmEasyIcon.svg";

//images for beatmap covers 
import cover1 from '../../assets/images/musicCovers/celticwhispersballad.png';
import cover2 from '../../assets/images/musicCovers/neonpulsesym.png';
import cover3 from '../../assets/images/musicCovers/celestialechoes.png';
import cover4 from '../../assets/images/musicCovers/nocturnalpursuit.png';

//images for artists
import artist2Image from "../../assets/images/featuredArtists/artist2.jpg";
import artist1Image from "../../assets/images/featuredArtists/artist1.jpg";
import artist3Image from "../../assets/images/featuredArtists/artist3.png";

import tempBeatmap from "../../assets/beatmapFiles/beatmapMockFile.zip";

const albumCovers = {'cover1': cover1, 'cover2': cover2, 'cover3': cover3, 'cover4': cover4};
const artistImages = {'artist1Image': artist1Image, 'artist2Image': artist2Image, 'artist3Image': artist3Image};


// const BACKEND_URL = 'http://localhost:5001';
//const BACKEND_URL = 'https://api-virtuosos.us-west-1.elasticbeanstalk.com';


function BeatmapPage() {
    const beatmap_list = {
        beatmap_info: 
            [
                {
                    id : 1,
                    songName : 'Celtic Whispers Ballad',
                    artist : 'Folklore Minstrel',
                    beatmap_artist : 'Folklore Minstrel',
                    songCoverImg: 'cover1',
                    artistImg: 'artist2Image',
                    releaseDate: '2024-05-18',
                    difficultyLink : ['Easy', 'Normal', 'Hard'],
                    playCount: 0,
                    likeCount: 0,
                    songDuration: '3:45',
                    bpm : 145,
                    noteCount: 1000,
                    sliderCount: 50,
                    source: "Folklore Chronicles World",
                    tags: ['Celtic', 'Folklore', 'Traditional', 'World'],
                    description: 'Embark on a folkloric journey with "Celtic Whispers Ballad." Folklore Minstrel, both artist and beatmap creator, weaves traditional tunes into an immersive experience. Each note carries the essence of a rich musical adventure.'
                },
                {
                    id : 2,
                    songName : 'Neon Pulse Symphony',
                    artist : 'Techo Maestro',
                    beatmap_artist : 'Techo Maestro',
                    songCoverImg: 'cover2',
                    artistImg: 'artist1Image',
                    releaseDate: '2024-05-18',
                    difficultyLevels : ['Easy', 'Normal', 'Hard'],
                    playCount: 0,
                    likeCount: 0,
                    songDuration: '2:30',
                    bpm : 150,
                    noteCount: 800,
                    sliderCount: 61,
                    source: "Techno Adventures World",
                    tags: ['Neon', 'Synthwave'],
                    description : 'Dive into the cutting-edge realm of Techno Adventures World, where futuristic technology meets thrilling escapades. Explore cyber landscapes, master advanced gadgets, and overcome digital challenges in this electrifying journey through the next frontier.'
                },
                {
                    id : 3,
                    songName : 'Celestial Echoes',
                    artist : 'Celestial Harmonics',
                    beatmap_artist : 'StarNavigator',
                    songCoverImg: 'cover3',
                    artistImg: 'artist3Image',
                    releaseDate: '2024-05-18',
                    difficultyLink : ['Easy', 'Normal'],
                    playCount: 0,
                    likeCount: 0,
                    songDuration: '1:55',
                    bpm : 220,
                    noteCount: 780,
                    sliderCount: 43,
                    source: "Celestial Harmonics Universe",
                    tags: ['Night', 'Starry'],
                    description: "Immerse yourself in the ethereal beauty of the Celestial Harmonics Universe. This cosmic odyssey blends astral melodies with interstellar exploration, creating a symphony of wonder and discovery among the stars. Let the harmonies guide you through the celestial expanse."
    
                },
                {
                    id : 4,
                    songName : 'Nocturnal Pursuit',
                    artist : 'ShadowWeaver',
                    beatmap_artist : 'ShadowWeaver',
                    songCoverImg: 'cover4',
                    artistImg: 'artist1Image',
                    releaseDate: '2024-05-18',
                    difficultyLink : ['Easy', 'Normal'],
                    playCount: 0,
                    likeCount: 0,
                    songDuration: '4:03',
                    bpm : 120,
                    noteCount: 607,
                    sliderCount: 76,
                    source: "ShadowWeaver Mysteries",
                    tags: ['Dark', 'Mystery'],
                    description : 'Embark on a shadowy journey through the enigmatic world of ShadowWeaver Mysteries. Unravel secrets, solve riddles, and uncover hidden truths in this mysterious realm. Each note is a clue, each beat a step closer to the truth.'
                }
            ]
    }
    const navigate = useNavigate();
    const [beatmap, setBeatmap] = useState([]);
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    console.log('ID', id);
    async function fetchAll() {
        try {
            /*
            const route = BACKEND_URL + `/beatmapListing?id=${id}`;
            const response = await axios.get(route);
            */
            const response = beatmap_list;
            console.log(response.data.beatmap_info[0]);
            return response.data.beatmap_info;
        }
        catch (error) {
            console.log(error);
            return beatmap_list.beatmap_info;
        }
    }

    useEffect(() => {
        fetchAll().then(result => {
            console.log('RESULT', result);
            if (result && result.length > 0)
                setBeatmap(result[0]);
                console.log('beatmap', beatmap);
                if (beatmap.length < 1) {
                    setBeatmap(beatmap_list.beatmap_info[id-1]);
                    console.log('done');
                }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleBackClick = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className="w-full flex flex-col bg-page-accent-gray text-center text-body-overpass-base text-white font-body-overpass">
            <div className="titleContainer relative h-60 z-0 overflow-hidden lg:h-72">
                <div className="bgImgContainer w-full lg:-mt-64">
                    <img src={headerBackgroundImg} className="headerBackgroundImg w-full relative object-cover" alt="" />
                </div>
                <div className="absolute w-full h-12 bottom-0 z-3 flex justify-center text-white text-center font-title-lexend text-3xl font-bold">BEATMAPS</div>
                <div className="gradientOverlay absolute bottom-0 w-full h-[70%] bg-gradient-overlay z-1"></div>
            </div>

            <div className="backArrowContainer flex ">
                <button onClick={handleBackClick} className="self-start lg:ml-[73px] flex gap-1  border-none bg-transparent text-lilac text-font-size-xs items-center hover:underline hover:text-gray-300 hover:border-none ">
                    <FaArrowLeft size={20} />
                    Back
                </button>
            </div>

            <div className="bmContent flex flex-col lg:items-center">
                <div className="bmSongInfoSection h-40 flex flex-col justify-center items-start pt-8 px-4 pb-2 lg:w-11/12 ">
                    <div className="bmSongNameContainer flex text-lg font-title-lexend ">
                        {beatmap.songName}
                    </div>
                    <div className="countInfoSection flex font-title-lexend gap-2">
                        <div className="playCountInfoContainer flex gap-[2px] text-sm font-medium font-overpass-mono ">
                            <img src={playIcon} className="playIcon fill-white " alt="" />
                            <b className="pt-2">
                                {beatmap.playCount}
                            </b>
                        </div>
                        <div className="likeCountInfoContainer flex gap-[2px] text-sm font-medium font-overpass-mono">
                            <img src={heartIcon} className="heartIcon fill-white" alt="" />
                            <b className="pt-2">
                                {beatmap.likeCount}
                            </b>
                        </div>
                    </div>
                    <div className="bmAdditionalInfoSection flex w-full py-4 justify-between ">
                        <div className="bmArtistInfoSection flex flex-col justify-between">
                            <div className="artistDetails flex ">
                                <img className="artistImage rounded-full h-8 flex" src={artistImages[beatmap.artistImg]} alt="artist"/>
                                {/* <img className="artistImage w-8 h-8 flex-shrink-0 rounded-full bg-lightgray bg-cover bg-no-repeat" src={artistImages[beatmap.artistImg]} alt=""/> */}
                                <div className="artistTitleContainer flex self-center justify-around pb-4">
                                    <div className="artistName w-full font-overpass-mono text-base font-normal leading-4 pt-1 text-center px-2">
                                        {beatmap.artist}
                                    </div>
                                    <img className="verifiedIcon w-3 h-3 p-1" src={verifiedIcon} alt=""/>
                                </div>
                            </div>
                            <div className="releaseDate text-sm font-light font-overpass-mono text-left">
                                released {beatmap.releaseDate}
                            </div>    
                        </div>
                        <div className="bmDifficultySection flex flex-col justify-between">
                            <div className= "bmDifficultyInfoSection flex justify-end">
                                <img src={easyIcon} className="diffIcon w-4 h-4" alt=""/>
                                <div className= "difficultyScore text-base pl-2">
                                    2.3  
                                </div>
                            </div>
                            <div className= "diffBarContainer">
                                <img src={bmDifficultyBar} className= "diffBar" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                <hr></hr>

                <div className="gameInfoAndDescripContainer flex flex-col lg:flex-row px-4 py-4 lg:w-11/12">
                    <div className="beatmapGameInfoSectionContainer flex lg:flex-1 lg:justify-center">
                        <div className="beatmapGameInfoSection flex flex-col py-3 justify-center items-center lg:border lg:border-neutral-200 lg:self-center lg:rounded-2xl lg:shadow-lilac lg:shadow-md lg:w-7/12">
                            <div className="beatmapInfo flex gap-1 ">
                                <img src={albumCovers[beatmap.songCoverImg]} className="coverImg" alt=""></img>
                                <div className="beatmapInfoSection flex flex-col gap-2">
                                    <div className="mapperInfo pt-2 font-light font-overpass-mono flex text-left">
                                        Mapped by {beatmap.beatmap_artist}
                                    </div>
                                    <div className="bmData flex gap-2 pl-2">
                                        <div className="bmDataItem h-4 flex">
                                            <img src={durationIcon} className="bmsvg pt-[2px]" alt="" />
                                            <b>
                                                {beatmap.songDuration}
                                            </b>
                                        </div>
                                        <div className="bmDataItem h-5 flex">
                                            <img className="bmsvg " src={bpmIcon} alt="" />
                                            <b>
                                                {beatmap.bpm}
                                            </b>
                                        </div>
                                        <div className="bmDataItem h-4 flex">
                                            <img className="bmsvg pt-[2px]" src={noteCountIcon} alt="" />
                                            <b>
                                                {beatmap.noteCount}
                                            </b>
                                        </div>
                                        <div className="bmDataItem h-4 flex">
                                            <img className="bmsvg pt-[2px]" src={sliderCountIcon} alt="" />
                                            <b>
                                                {beatmap.sliderCount}
                                            </b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bmStatInfo mt-2">
                                <div className="bmStatItem flex px-2 py-2 items-center justify-center">
                                    <div className="bmStatAttribute w-20 font-light">
                                        HP Drain
                                    </div>
                                    <div className="valueBar px-2 content-center">
                                        <img src={bm30ValueBar} className="bmValueBar " alt=""/>
                                    </div>
                                    <div className="bmStatValue">5</div>
                                </div>
                                <div className="bmStatItem flex px-2 py-2 items-center justify-center">
                                    <div className="bmStatAttribute w-20 font-light">
                                        Approach Rate
                                    </div>
                                    <div className="valueBar px-2 content-center">
                                        <img src={bm30ValueBar} className="bmValueBar " alt=""/>
                                    </div>
                                    <div className="bmStatValue ">7</div>
                                </div>
                                <a href={tempBeatmap} target="_blank" rel="noopener noreferrer" download>
                                    <button type="button" className="downloadButton w-1/2 h-8 bg-transparent border border-white transition-colors duration-700 hover:bg-white hover:text-black">
                                        Download
                                    </button>
                                </a>
                            </div>

                        </div>
                    </div>
                    <hr className="block lg:hidden" ></hr>
                    
                    <div className="descripAndTagSection flex flex-col flex-1">
                        <div className="bmDescription flex py-2 px-4 text-left">
                            {beatmap.description}
                        </div>

                        <div className="tagSection flex flex-col text-left font-['Overpass_Mono'] px-4 py-8 text-base font-normal"> 
                            <div className="tagItem flex pb-4">
                                <div className="tagTitle pr-4">
                                    Source:
                                </div>
                                <div className="tagValues text-[#d5a6ed]">
                                    {beatmap.source}
                                </div>
                            </div>
                            <div className="tagItem flex pb-4">
                                <div className="tagTitle pr-4">
                                    Tags:
                                </div>
                                <div className="tagValues text-[#d5a6ed]">
                                    {(beatmap.tags) && (beatmap.tags).join(', ')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BeatmapPage;




