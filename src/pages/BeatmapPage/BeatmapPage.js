// import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./BeatmapPage.module.css";
import homeStyles from "../Homepage/Homepage.module.css";
import React, { useEffect, useState } from "react";
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

    return (
        <div className={styles.beatmaplistingPage}>
            <div className={homeStyles.gradientContainer}>
                <div className={styles.titleContainer}>
                    <div className={homeStyles.bgImgContainer}>
                        <img src={headerBackgroundImg} className={homeStyles.headerBackgroundImg} alt="" />
                    </div>
                    <div className={styles.titleText}>BEATMAP</div>
                    <div className={styles.gradientOverlay}></div>
                </div>
            </div>
            <div className={styles.bmContent}>
                <div className={styles.bmSongInfoSection}>
                    <div className={styles.bmSongName}>
                        {beatmap.songName}
                    </div>
                    <div className= {styles.countInfoSection}>
                        <div className={styles.playCountInfo}>
                            <img src={playIcon} className={styles.infoSvg} alt="" />
                            <b>
                                {beatmap.playCount}
                            </b>
                        </div>
                        <div className={styles.heartCountInfo}>
                            <img src={heartIcon} className={styles.infoSvg} alt="" />
                            <b>
                                {beatmap.likeCount}
                            </b>
                        </div>
                    </div>
                    <div className={styles.bmAdditionalInfoSection}>
                        <div className={styles.bmArtistInfoSection}>
                            <div className={styles.artistDetails}>
                                <img className={styles.artistImage} src={artistImages[beatmap.artistImg]} alt=""/>
                                <div className={styles.artistTitleContainer}>
                                    <div className={styles.artistName}>
                                        {beatmap.artist}                                        </div>
                                    <img className={styles.verifiedIcon} src={verifiedIcon} alt=""/>
                                </div>
                            </div>
                            <div className={styles.releaseDate}>
                                released {beatmap.releaseDate}
                            </div>    
                        </div>
                        <div className={styles.bmDifficultySection}>
                            <div className= {styles.bmDifficultyInfoSection}>
                                <img src={easyIcon} className={styles.diffIcon} alt=""/>
                                <div className={styles.difficultyScore}>
                                    2.3  
                                </div>
                            </div>
                            <div className= {styles.bmDiffBar}>
                                <img src={bmDifficultyBar} className={styles.diffBar} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className={styles.beatmapGameInfoSection}>
                    <div className={styles.beatmapInfo}>
                        <img src={albumCovers[beatmap.songCoverImg]} className={styles.coverImg} alt=""></img>
                        <div className= {styles.bmInfoSection}>
                            <div className={styles.mapperInfo}>
                                mapped by {beatmap.beatmap_artist}
                            </div>
                            <div className={styles.bmData}>
                                <div className={styles.bmDataItem}>
                                    <img src={durationIcon} className={styles.bmSvg} alt="" />
                                    <b>
                                        {beatmap.songDuration}
                                    </b>
                                </div>
                                <div className={styles.bmDataItem}>
                                    <img className={styles.bmSvg} src={bpmIcon} alt="" />
                                    <b>
                                        {beatmap.bpm}
                                    </b>
                                </div>
                                <div className={styles.bmDataItem}>
                                    <img className={styles.bmSvg} src={noteCountIcon} alt="" />
                                    <b>
                                        {beatmap.noteCount}
                                    </b>
                                </div>
                                <div className={styles.bmDataItem}>
                                    <img className={styles.bmSvg} src={sliderCountIcon} alt="" />
                                    <b>
                                        {beatmap.sliderCount}
                                    </b>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.bmStatInfo}>
                        <div className={styles.bmStatItem}>
                            <div className={styles.bmStatAttribute}>
                                HP Drain
                            </div>
                            <div className={styles.valueBar}>
                                <img src={bm30ValueBar} className={styles.bmValueBar} alt=""/>
                            </div>
                            <div className={styles.bmStatValue}>5</div>
                        </div>
                        <div className={styles.bmStatItem}>
                            <div className={styles.bmStatAttribute}>
                                Approach Rate
                            </div>
                            <div className={styles.valueBar}>
                                <img src={bm30ValueBar} className={styles.bmValueBar} alt=""/>
                            </div>
                            <div className={styles.bmStatValue}>7</div>
                        </div>
                        <a href={tempBeatmap} target="_blank" rel="noopener noreferrer" download>
                            <button type="button" className={styles.downloadButton}>
                                Download
                            </button>
                        </a>
                    </div>
                    <hr></hr>
                    <div className={styles.bmDescription}>
                        {beatmap.description}
                    </div>

                    <div className={styles.tagSection}> 
                        <div className={styles.tagItem}>
                            <div className={styles.tagTitle}>
                                Source:
                            </div>
                            <div className={styles.tagValues}>
                                {beatmap.source}
                            </div>
                        </div>
                        <div className={styles.tagItem}>
                            <div className={styles.tagTitle}>
                                Tags:
                            </div>
                            <div className={styles.tagValues}>
                                {(beatmap.tags) && (beatmap.tags).join(', ')}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default BeatmapPage;




