import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./BeatmapListingPage.module.css";
// import homeStyles from "../Homepage/Homepage.module.css";

import React from "react";
import axios from "axios";

import headerBackgroundImg from '../../assets/images/headerBackground.png';
import searchIcon from '../../assets/icons/searchIcon.svg';


import bmDiffIcon from '../../assets/icons/bmDifficultyIcon.svg';
import easyDiffIcon from '../../assets/icons/easyCircleIcon.svg';
import normalDiffIcon from '../../assets/icons/normalCircleIcon.svg';
import hardDiffIcon from '../../assets/icons/hardCircleIcon.svg';
import playIcon from '../../assets/icons/playIcon.svg';
import heartIcon from '../../assets/icons/heartIcon.svg';


//images for beatmap covers 
import cover1 from '../../assets/images/musicCovers/celticwhispersballad.png';
import cover2 from '../../assets/images/musicCovers/neonpulsesym.png';
import cover3 from '../../assets/images/musicCovers/celestialechoes.png';
import cover4 from '../../assets/images/musicCovers/nocturnalpursuit.png';

const albumCovers = [cover1, cover2, cover3, cover4];

// const BACKEND_URL = 'http://localhost:5001';
const BACKEND_URL = 'http://api-virtuosos.us-west-1.elasticbeanstalk.com';

function BeatmapListingPage() {
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
                    playCount: 504,
                    likeCount: 145,
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
    const [originalBeatmapList, setOriginalBeatmapList] = useState([]);
    const [beatmapList, setBeatmapList] = useState([]);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');

    const [query, setQuery] = useState(searchQuery || '');
    // const [results, setResults] = useState([]);

    async function fetchAll() {
        try {
            const route = BACKEND_URL + '/beatmapListing/' + (searchQuery? ('?search=' + searchQuery) : '');
            // console.log('ROUTE', route);
            const response = await axios.get(route);
            return response.data.beatmap_info;
        }
        catch (error) {
            console.log('FETCH_ALL', error);
            console.log('Returning static beatmaps')
            return beatmap_list.beatmap_info;
        }
    }

    useEffect(() => {
        fetchAll().then(result => {
            console.log('RESULT', result);
            if (result) setBeatmapList(result);
            setOriginalBeatmapList(result);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // uncomment this to use api call for search (how it is commonly done)
    // const handleSearch = async (e) => {
    //     e.preventDefault();
    //     // setQuery(e.target.value);
    //     const result = await makeGetCall(query);
    //     if (result && result.data) {
    //         setBeatmapList(result.data.beatmap_info);
    //     }
    // };

    // uncomment this too to use with handleSearch
    // async function makeGetCall(keyword) {
    //     try {
    //         const route = BACKEND_URL + '/beatmapListing' + (keyword ? `?search=${keyword}` : '');
    //         const response = await axios.get(route);
    //         return response;
    //     } catch (error) {
    //         console.log("makeGetCall", error);
    //         return false;
    //     }
    // }

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        // console.log('input', e.target.value);
    };
    


    // can delete this function and the call to this function after backend is established
    // this function just checks if the backend fetchall call succeded and populated the beatmaplist. if not, it sets it to the default static beatmaps
    function check(e){
        if (beatmapList.length === 0){
            console.log('setting default beatmapList',beatmapList)
            setBeatmapList(beatmap_list.beatmap_info);
            setOriginalBeatmapList(beatmap_list.beatmap_info);
        }
    }
    check();

    //delete everything below and replace with the handleSearch function above when backend is established
    // this is another way to search filter since normally we want to make get requests to the backend with search parameters but since no backend yet
    // we will have to just filter the beatmapList useState variable on the server (not ideal)

    const handleSearchStatic = (e) => {
        e.preventDefault();
    
        // If the query is empty, reset to the original list
        if (query.trim() === '') {
            setBeatmapList(originalBeatmapList);
            return;
        }
    
        // Convert query to lowercase to make the search case-insensitive
        const lowercaseQuery = query.toLowerCase();
    
        // Filter the beatmapList based on the query
        const filteredBeatmaps = originalBeatmapList.filter((beatmap) => {
            return (
                beatmap.songName.toLowerCase().includes(lowercaseQuery) ||
                beatmap.artist.toLowerCase().includes(lowercaseQuery) ||
                beatmap.beatmap_artist.toLowerCase().includes(lowercaseQuery) ||
                beatmap.source.toLowerCase().includes(lowercaseQuery) ||
                beatmap.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
                beatmap.description.toLowerCase().includes(lowercaseQuery)
            );
        });
    
        setBeatmapList(filteredBeatmaps);
    };
    

    // only until here for deleting search stuff

    return (
        <div className="beatmapListingPage w-full bg-page-accent-gray overflow-hidden text-center text-white text-body-overpass-base font-body-overpass min-h-screen">
            
            <div className="titleContainer relative h-[12rem] z-0 overflow-hidden">
                <div className="bgImgContainer w-full lg:-mt-64">
                    <img src={headerBackgroundImg} className="headerBackgroundImg w-full relative object-cover" alt="" />
                </div>
                <div className={styles.titleText}>BEATMAPS</div>
                <div className="gradientOverlay absolute bottom-0 w-full h-[70%] bg-gradient-overlay z-1"></div>
            </div>
            <div class="searchBarContainer flex items-center px-4 pt-2 gap-1 rounded-lg shadow-md">
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleInputChange}
                    class="flex-grow py-2 px-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-900"
                />
                <button
                    type="button"
                    onClick={handleSearchStatic}
                    class="px-4 py-2 text-white rounded-r-lg hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-900"
                >
                    <img src={searchIcon} alt="Search" className="w-5 h-5" />
                </button>
            </div>


            {/* <div className={styles.beatmapListingFilterItem}>
                    <select className={styles.beatmapListingFilterItem} placeholder="sort by">
                        <option value="1">sort by: newest</option>
                        <option value="2">sort by: oldest</option>
                        <option value="3">sort by: most played</option>
                        <option value="4">sort by: least played</option>
                    </select>
                </div> */}
            
            <div className="bmListingDisplayModeContainer flex flex-col font-title-lexend text-[16px] font-bold pt-4 text-white items-center ">
                <div className="bmListingDisplayMode w-1/4 text-white flex justify-center">songs</div>
                {/* <div className={styles.bmListinDisplayModeItem}>artists</div> */}
                <hr className="hr flex w-4/5"></hr>
            </div>

            <BeatmapList beatmapList={beatmapList} />
            
        </div>
    );
}


function BeatmapList (props) {
    const navigate = useNavigate();
    
    const rows = props.beatmapList.map((beatmap, index) => {
        return ( 
            <div key={index} className="beatmapItemContainer px-4">
                <button type="button" 
                    className="beatMapButton flex flex-row justify-center items-center bg-white w-[21rem] relative rounded-xl overflow-hidden" 
                    onClick={() => navigate(`/beatmap?id=${beatmap.id}`)}
                >
                    <div className="beatMapItemContainer flex flex-row justify-center items-center gap-2">
                        <div className="musicCoverContainer flex flex-shrink-0 rounded-lg w-20 h-20 overflow-hidden">
                            <img src={albumCovers[beatmap.id-1]}  className="object-cover w-full h-full" alt="" />
                        </div>
                        <div className="musicInfo flex flex-col text-left justify-center font-body-overpass leading-6 w-56">
                            <div className="songTitleText flex text-left font-bold text-body-overpass-base  text-black">
                                {beatmap.songName}
                            </div>

                            <div className="artistText w-full relative text-sm font-medium text-black text-left flex items-center">
                                {beatmap.artist}
                            </div>

                            <div className="mappedByText pt-3 w-full relative text-sm font-medium text-black text-left inline-block">
                                mapped by {beatmap.beatmap_artist}
                            </div>
                            
                            <div className="gameInfoSection flex justify-between ">
                                <div className="difficultySection flex gap-1">
                                    <img src={bmDiffIcon} className="difficultyIcons w-3" alt="" />
                                    <img src={easyDiffIcon}  className="difficultyIcons w-3" alt="" />
                                    <img src={normalDiffIcon} className="difficultyIcons w-3" alt="" />
                                    <img src={hardDiffIcon} className="difficultyIcons w-3" alt="" />
                                </div>
                                <div className="mapStatsSection flex gap-3 items-center text-center">
                                    <div className="playCounts flex text-sm gap-1 font-normal items-center text-black">
                                        <img src={playIcon} className="playIcon w-4 object-fit" alt="" />
                                        <b className="items-center justify-center">
                                            {beatmap.playCount}
                                        </b>
                                    </div>
                                    <div className="likeCounts flex text-sm gap-1 font-normal items-center text-black">
                                        <img src={heartIcon} className="heartIcon w-4 object-fit" alt="" />
                                        <b>
                                            {beatmap.likeCount}
                                        </b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </button>
            </div>
        );
    });
    return (
        <div className="bmListContainer flex flex-row flex-wrap justify-center pt-2git  gap-2">
            {rows}
        </div>
    );
}

export default BeatmapListingPage;




