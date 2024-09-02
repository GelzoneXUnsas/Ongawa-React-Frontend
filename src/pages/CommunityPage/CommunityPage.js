import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import React from "react";
import axios from "axios";

import headerBackgroundImg from '../../assets/images/headerBackground.png';
import searchIcon from '../../assets/icons/searchIcon.svg';

// import artist1Image from "../../assets/images/featuredArtists/artist1.jpg";
// import artist2Image from "../../assets/images/featuredArtists/artist2.jpg";
// import artist3Image from "../../assets/images/featuredArtists/artist3.png";
// const images = [artist1Image, artist2Image, artist3Image];

// import heartIcon from '../../assets/icons/heartIcon.svg';

const BACKEND_URL = 'http://api-virtuosos.us-west-1.elasticbeanstalk.com';

function CommunityPage() {
    const posts_list = {
        post_info: 
            [
                {
                    authorImg: 'artist1Image',
                    authorName: 'The Shadow Weaver',
                    postDate: '2024-02-17',
                    postTitle: 'Unraveling the Sonic Mysteries',
                    postContent: "Hey fellow gamers and music enthusiasts! 🎮🎵 Just completed Level 5 in the rhythm adventure – those beats were...",
                    likeCount: 2300,
                    commentCount: 1400,
                    viewCount: 6800,
                },
                {
                    authorImg: 'artist2Image',
                    authorName: 'Techno Maestro',
                    postDate: '2024-03-04',
                    postTitle: 'Exciting Update: New levels!',
                    postContent: "Dear players, get ready for a sonic adventure upgrade! 🚀🎮 We're thrilled to announce the release of three new levels next week. Your feedback has been invaluable – let us know what you hope to encounter in these upcoming challenges. 🌟 #GameUpdate #CommunityFeedback",
                    likeCount: 5500,
                    commentCount: 2400,
                    viewCount: 7800,
                },
                {
                    authorImg: 'artist3Image',
                    authorName: 'The Sound Sorcerer',
                    postDate: '2023-04-29',
                    postTitle: 'Crafting a Musical Odyssey',
                    postContent: "Greetings fellow creators! 🎵✨ Just composed a new track inspired by the game's enchanting world. Share your...",
                    likeCount: 2100,
                    commentCount: 1200,
                    viewCount: 6500,
                },
                
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
        if (option === 'newest') {
            sortedList.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
        } else if (option === 'oldest') {
            sortedList.sort((a, b) => new Date(a.postDate) - new Date(b.postDate));
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
    
    const rows = props.postList.map((post, index) => {
        return ( 
            <div className="postContainer bg-community-post-gradient justify-center content-center w-80 h-52 p-4">
                {/* <div className="postHeader">
                    <div className="metaInfo flex justify-between">
                        <div className="authorInfo">
                            <div className="authorImgContainer flex flex-shrink-0 rounded-full w-20 h-20 overflow-hidden">
                                <img className="authorImg " src={images[index]} alt="Profile pictue"/>
                            </div>

                            <div className="authorNameContainer ">
                                {post.authorName}   
                            </div>
                        </div>
                        <div className="postDateContainer ">
                            {post.postDate}   
                        </div>
                    </div>

                </div> */}



                Post
            </div>
        );
    });
    return (
        <div className="postListContainer flex flex-row flex-wrap justify-center py-4 gap-3">
            {rows}
        </div>
    );
}

export default CommunityPage;




