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
    const [beatmapList, setBeatmapList] = useState([]);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');

    const [query, setQuery] = useState(searchQuery || '');
    // const [results, setResults] = useState([]);

    async function fetchAll() {
        try {
            const route = BACKEND_URL + '/beatmapListing/' + (searchQuery? ('?search=' + searchQuery) : '');
            console.log('ROUTE', route);
            const response = await axios.get(route);
            console.log(response.data);
            return response.data.beatmap_info;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }

    useEffect(() => {
        fetchAll().then(result => {
            console.log('RESULT', result);
            if (result)
                setBeatmapList(result);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        setQuery(e.target.value);
        console.log('Query:', query);

        updateList(query);
        // Perform any additional logic or API calls here
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        // console.log('input', e.target.value);
    };
    
    async function makeGetCall(keyword) {
        try {
            const route = BACKEND_URL + '/beatmapListing';
            const response = await axios.get(route, keyword);
            return response;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }

    //make get call everytime a user searches for a beatmap
    function updateList(keyword) {
        makeGetCall(keyword).then( result => {
            if (result && result.status === 200)
                setBeatmapList([...beatmapList, keyword]);
        });
    }
    function check(e){
        console.log('this is the beatmap list',beatmapList)
        if (beatmapList.length === 0){
            setBeatmapList(beatmap_list.beatmap_info);}
    }
    check();

    return (
        <div className="beatmapListingPage w-full bg-page-accent-gray overflow-hidden text-center text-white text-body-overpass-base font-body-overpass min-h-screen">
            
            <div className="titleContainer relative h-[12rem] z-0 overflow-hidden">
                <div className="bgImgContainer w-full lg:-mt-64">
                    <img src={headerBackgroundImg} className="headerBackgroundImg w-full relative object-cover" alt="" />
                </div>
                <div className={styles.titleText}>BEATMAPS</div>
                <div className="gradientOverlay absolute bottom-0 w-full h-[70%] bg-gradient-overlay z-1"></div>
            </div>
            {/* <div className="searchBarSection w-auto h-20 px-4 pt-4 flex flex-col bg-page-accent-gray text-search-text-gray font-overpass-mono text-body-overpass-base font-medium">
                <form action="" className="searchBar flex items-center justify-center w-full h-[1.5rem] rounded-sm bg-amber-500 space-x-2">
                    <input
                        name="search"
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        placeholder="song, album, artist"
                        className="flex-grow border-none rounded-sm px-2 py-1 focus:outline-none focus:border-blue-500"
                    />
                    <img src={searchIcon} alt="Search" className="w-5 h-5" onClick={handleSearch} />
                </form>
                
            </div> */}
            <div class="flex items-center px-4 pt-2 gap-1 rounded-lg shadow-md">
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleInputChange}
                    class="flex-grow py-2 px-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-900"
                />
                <button
                    type="button"
                    onClick={handleSearch}
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
            <div className={styles.bmListingDisplayMode}>
                <div className={styles.bmListingDisplayModeContainter}>
                    <div className={styles.bmListinDisplayModeItem}>songs</div>
                    {/* <div className={styles.bmListinDisplayModeItem}>artists</div> */}
                </div>
                <hr></hr>
                    <BeatmapList beatmapList={beatmapList} />
            </div>
        </div>
    );
}


function BeatmapList (props) {
    const navigate = useNavigate();
    
    const rows = props.beatmapList.map((beatmap, index) => {
        return ( 
            <div key={index}>
                <button type="button" className={styles.bmListItem} onClick={() => navigate(`/beatmap?id=${beatmap.id}`)}>
                    <div className={styles.musiccoverIcon}>
                        <img src={albumCovers[beatmap.id-1]} alt="" />
                    </div>
                    <div className={styles.musiccoverInfo}>
                        <div className={styles.songTitleText}>
                            {beatmap.songName}
                        </div>
                        <div className={styles.songArtistText}>
                            {beatmap.artist}
                        </div>
                        <div className={styles.mappedByText}>
                            mapped by {beatmap.beatmap_artist}
                        </div>
                        <div className={styles.gameInfoSection}>
                            <div className={styles.difficultySection}>
                                <img src={bmDiffIcon} alt="" />
                                <img src={easyDiffIcon} alt="" />
                                <img src={normalDiffIcon} alt="" />
                                <img src={hardDiffIcon} alt="" />
                            </div>
                            <div className= {styles.countInfoSection}>
                                <div className={styles.playCountInfo}>
                                    <img src={playIcon} alt="" />
                                    <b>
                                        {beatmap.playCount}
                                    </b>
                                </div>
                                <div className={styles.heartCountInfo}>
                                    <img src={heartIcon} alt="" />
                                    <b>
                                        {beatmap.likeCount}
                                    </b>
                                </div>
                            </div>
                        </div>
                    </div>
                </button>
            </div>
        );
    });
    return (
        <div className={styles.bmListContainer}>
            {rows}
        </div>
    );
}

export default BeatmapListingPage;




