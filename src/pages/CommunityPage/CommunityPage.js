import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import React from "react";
import axios from "axios";

import headerBackgroundImg from '../../assets/images/headerBackground.png';
import searchIcon from '../../assets/icons/searchIcon.svg';

// import heartIcon from '../../assets/icons/heartIcon.svg';

const BACKEND_URL = 'http://api-virtuosos.us-west-1.elasticbeanstalk.com';

function CommunityPage() {
    const posts_list = {
        post_info: 
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
                    releaseDate: '2025-05-18',
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
                    releaseDate: '2023-05-18',
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
                    releaseDate: '2022-05-18',
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
    const [originalPostList, setOriginalPostList] = useState([]);
    const [postList, setPostList] = useState([]);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');

    const [query, setQuery] = useState(searchQuery || '');
    const [sortOption, setSortOption] = useState('newest');
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
            console.log('Returning static posts')
            return posts_list.post_info;
        }
    }

    useEffect(() => {
        document.title = 'Community - Ongawa';
        fetchAll().then(result => {
            console.log('RESULT', result);
            if (result) setPostList(result);
            setOriginalPostList(result);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSort = useCallback((option) => {
        let sortedList = [...postList];
        if (option === 'alphabetical') {
            sortedList.sort((a, b) => a.songName.localeCompare(b.songName));
        } else if (option === 'newest') {
            sortedList.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        } else if (option === 'oldest') {
            sortedList.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
        }
        setPostList(sortedList);
    }, [postList]);

    useEffect(() => {
        handleSort(sortOption);
    }, [sortOption, postList, handleSort]);

    // uncomment this to use api call for search (how it is commonly done)
    // const handleSearch = async (e) => {
    //     e.preventDefault();
    //     // setQuery(e.target.value);
    //     const result = await makeGetCall(query);
    //     if (result && result.data) {
    //         setPostList(result.data.beatmap_info);
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
    // this function just checks if the backend fetchall call succeded and populated the postlist. if not, it sets it to the default static posts
    function check(e){
        if (postList.length === 0){
            console.log('setting default posts list',postList)
            setPostList(posts_list.post_info);
            setOriginalPostList(posts_list.post_info);
        }
    }
    check();

    //delete everything below and replace with the handleSearch function above when backend is established
    // this is another way to search filter since normally we want to make get requests to the backend with search parameters but since no backend yet
    // we will have to just filter the postList useState variable on the server (not ideal)

    const handleSearchStatic = (e) => {
        e.preventDefault();
    
        // If the query is empty, reset to the original list
        if (query.trim() === '') {
            setPostList(originalPostList);
            return;
        }
    
        // Convert query to lowercase to make the search case-insensitive
        const lowercaseQuery = query.toLowerCase();
    
        // Filter the posts based on the query
        const filteredPosts = originalPostList.filter((post) => {
            return (
                post.songName.toLowerCase().includes(lowercaseQuery) ||
                post.artist.toLowerCase().includes(lowercaseQuery) ||
                post.beatmap_artist.toLowerCase().includes(lowercaseQuery) ||
                post.source.toLowerCase().includes(lowercaseQuery) ||
                post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
                post.description.toLowerCase().includes(lowercaseQuery)
            );
        });
    
        setPostList(filteredPosts);
    };
    

    // only until here for deleting search stuff

    return (
        <div className="CommuityPage w-full bg-page-accent-gray overflow-hidden text-center text-white text-body-overpass-base font-body-overpass min-h-screen">
            
            <div className="titleContainer relative h-60 z-0 overflow-hidden lg:h-72">
                <div className="bgImgContainer w-full lg:-mt-64">
                    <img src={headerBackgroundImg} className="headerBackgroundImg w-full relative object-cover" alt="" />
                </div>
                <div className="absolute w-full h-12 bottom-0 z-3 flex justify-center text-white text-center font-title-lexend text-3xl font-bold">COMMUNITY</div>
                <div className="gradientOverlay absolute bottom-0 w-full h-[70%] bg-gradient-overlay z-1"></div>
            </div>
            <div class="searchBarContainer flex px-4 pt-2 gap-1 rounded-lg shadow-md">
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

            <div className="sortByContainer flex px-4 justify-start lg:px-28">
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="sortByDropdown w-52 py-2 border border-gray-300 rounded-lg bg-gray-800 text-white text-font-size-xs lg:w-56"
                    // style={{
                    //     background: `url('arrow icon here') no-repeat right center`,
                    // }}
                >
                    <option value="1">Sort by: Option 1</option>
                    <option value="2">Sort by: Option 2</option>
                    <option value="3">Sort by: Option 3</option>
                </select>
            </div>

            {/* <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown button
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                </div>
            </div> */}


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

            <PostList postList={postList} />
            
        </div>
    );
}


function PostList (props) {
    // const navigate = useNavigate();
    
    const rows = props.postList.map((beatmap, index) => {
        return ( 
            <div className="postContainer bg-community-post-gradient justify-center content-center w-80 h-52">
                Post
            </div>
        );
    });
    return (
        <div className="postListContainer flex flex-row flex-wrap justify-center pt-2git  gap-2">
            {rows}
        </div>
    );
}

export default CommunityPage;




