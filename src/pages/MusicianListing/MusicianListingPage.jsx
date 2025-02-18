import {useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import React from "react";
import axios from "axios";

import headerBackgroundImg from '../../assets/images/headerBackground.png';
import searchIcon from '../../assets/icons/searchIcon.svg';

import artist2Image from "../../assets/images/featuredArtists/artist2.jpg";
import artist1Image from "../../assets/images/featuredArtists/artist1.jpg";
import artist3Image from "../../assets/images/featuredArtists/artist3.png";
const images = [artist1Image, artist2Image, artist3Image];
//images for beatmap covers

const musican_list = {
    musician_infos: 
        [
            {
                id : 1,
                musicianName : 'Techo Maestro',
                artistImg: 'artist1Image',
                totalSongs: 25,
                totalPlaycount: 538,
            },
            {
                id : 2,
                musicianName : 'The Shadow Weaver',
                artistImg: 'artist2Image',
                totalSongs: 16,
                totalPlaycount: 386,
            },
            {
                id : 3,
                musicianName : 'The Sound Sorcerer',
                artistImg: 'artist3Image',
                totalSongs: 14,
                totalPlaycount: 479,
            },
        ]
}









 const BACKEND_URL = 'http://localhost:5001';
//const BACKEND_URL = 'http://api-virtuosos.us-west-1.elasticbeanstalk.com';

function MusicianListingPage() {
    const [musicianList, setMusicianList] = useState([]);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');
    const [query, setQuery] = useState(searchQuery || '');
     // eslint-disable-next-line no-unused-vars
    const [sortOption, setSortOption] = useState('newest');

    // const [results, setResults] = useState([]);

    async function fetchAll() {
        try {
            const route = BACKEND_URL + '/musicianListing/' + (searchQuery? ('?search=' + searchQuery) : '');
            console.log('ROUTE', route);
            const response = await axios.get(route);
            console.log(response.data);
            return response.data.musician_infos;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }

    const handleSort = useCallback((option) => {
        let sortedList = [...musicianList];
        if (option === 'alphabetical') {
            sortedList.sort((a, b) => a.musicianName.localeCompare(b.musicianName));
        } else if (option === 'Mpop') {
            sortedList.sort((a, b) => b.totalPlaycount - a.totalPlaycount);
        } else if (option === 'Msongs') {
            sortedList.sort((a, b) => b.totalSongs - a.totalSongs);
        }
        setMusicianList(sortedList);
    }, [musicianList]);
    useEffect(() => {
        handleSort(sortOption);
    }, [sortOption, musicianList, handleSort]);



    useEffect(() => {
        document.title = 'Musicains - Ongawa';
        fetchAll().then(result => {
            console.log('RESULT', result);
            if (result)
                setMusicianList(result);
        });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },[]);

    const handleSearch = (e) => {
        e.preventDefault();
        setQuery(e.target.value);
        console.log('Query:', query);

        updateList(query);
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        console.log('input', e.target.value);
    };
    
    async function makeGetCall(keyword) {
        try {
            const route = BACKEND_URL + '/musicianListing';
            const response = await axios.get(route, keyword);
            return response;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }

    //make get call everytime a user searches for a musician
    function updateList(keyword) {
        makeGetCall(keyword).then( result => {
            if (result && result.status === 200)
                setMusicianList([...musicianList, keyword]);
        });
    }

    return (
        <div className="beatmapListingPage w-full bg-page-accent-gray overflow-hidden text-center text-white text-body-overpass-base font-body-overpass min-h-screen">
            <div className="titleContainer relative h-60 z-0 overflow-hidden lg:h-72">
                <div className="bgImgContainer w-full lg:-mt-64">
                    <img src={headerBackgroundImg} className="headerBackgroundImg w-full relative object-cover" alt="" />
                </div>
                <div className="absolute w-full h-12 bottom-0 z-3 flex justify-center text-white text-center font-title-lexend text-3xl font-bold">MUSICIANS</div>
                <div className="gradientOverlay absolute bottom-0 w-full h-[70%] bg-gradient-overlay z-1"></div>
            </div>
            <div className="w-auto h-20 px-4 py-4 flex flex-col bg-[#232323] justify-around text-[#B2B2B2] font-['Overpass_Mono'] text-[var(--body-overpass-base-size)] font-medium">
            <div class="searchBarContainer flex items-center px-4 pt-2 gap-1 rounded-lg shadow-md">
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleInputChange}
                    class="flex-grow py-2 px-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-900"
                />
                <button
                    type="button"
                    onClick={handleSearch}
                    class="px-4 py-2 text-white rounded-r-lg border-none hover:bg-page-accent-gray focus:outline-none focus:ring-2 focus:ring-purple-900 transform transition-transform duration-300 hover:scale-105"
                    style={{
                        backgroundColor: '#2d2c5f',
                        border: "none",
                    }}
                >
                    <img src={searchIcon} alt="Search" className="w-5 h-5" />
                </button>
            </div>
            


            </div>
            <div className="flex flex-col bg-[#232323] text-white">
                <hr></hr>
                    <MusicianList musicianList={musican_list.musician_infos} />
            </div>
        </div>
    );
}




function MusicianList(props) {
    const navigate = useNavigate();
    const rows = props.musicianList.map((musician) => (
        <div
    key={musician.id} // Ensure each child has a unique key
    className="outline-none cursor-pointer rounded-[15px] p-4 group" // removed hover:bg-[#2d2c5f]
    onClick={() => navigate(`/musician?id=${musician.id}`)}
>
    <img
        className="w-48 h-48 object-cover rounded-[15px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] mx-auto group-hover:scale-105 transition-transform duration-300"
        src={images[musician.id - 1]}
        alt="Profile img"
    />
    <div className="text-[var(--icon-color,#FFF)] text-center font-['Lexend_Exa'] text-[18px] font-bold leading-[24px] group-hover:translate-y-[5px] transition-transform duration-300">
        {musician.musicianName}
    </div>
    <p className="text-[var(--icon-color,#FFF)] text-center font-['Overpass_Mono'] text-[16px] font-medium leading-[24px] group-hover:translate-y-[5px] transition-transform duration-300">
        {musician.totalSongs} songs | {musician.totalPlaycount} plays
    </p>
</div>
    ));

    return (
        <div className="flex flex-col md:flex-row md:justify-center md:space-x-4 space-y-4 md:space-y-0 py-4 w-full">
            {rows}
        </div>
    );
}


export default MusicianListingPage;