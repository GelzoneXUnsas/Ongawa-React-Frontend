import { Link } from "react-router-dom";

import CommunityPost from "../../components/CommunityPost/CommunityPost";
import CommunityReply from "../../components/CommunityReply/CommunityReply";

import leftArrowIcon from "../../assets/icons/leftArrowIcon.png";
import geoBg from "../../assets/images/backgrounds/geo_bg.png";

// Test images
import testImg1 from "../../assets/images/test/1-1_Test_Image.png";
import testImg5 from "../../assets/images/test/16-10_Test_Image.png";
// Mock Community Post
const COMMUNITY_POST = {
  id: 1,
  author: "Aoife Byrne",
  profilePicture: "/images/profiles/aoife.jpg",
  dateCreated: "June 12, 2025",
  title: "Celtic Song",
  tags: ["Celtic", "Traditional"],
  text: "This haunting melody originates from the hills of Ireland...",
  media: [testImg5, testImg1],
  cover: testImg1,
  replies: [
    {
      id: 101,
      author: "Lior Mizrahi",
      profilePicture: "/images/profiles/lior.jpg",
      dateCreated: "June 13, 2025",
      text: "This is a beautiful song!",
      replies: [
        {
          id: 201,
          author: "Samira Khan",
          profilePicture: "/images/profiles/samira.jpg",
          dateCreated: "June 14, 2025",
          text: "Especially the harmony around 1:20!",
        },
        {
          id: 202,
          author: "James Earnest",
          profilePicture: "/images/profiles/james.jpg",
          dateCreated: "June 18, 2025",
          text: "I had the same thought!",
        },
      ],
    },
    {
      id: 102,
      author: "Takeshi Nakamura",
      profilePicture: "/images/profiles/takeshi.jpg",
      dateCreated: "June 13, 2025",
      text: "I can almost hear this played on the shamisen. Inspiring.",
    },
  ],
};

function CommunityPostPage() {
  return (
    <div className="min-h-screen bg-page-background text-light-grey ">
      {/* Back Button */}
      <Link
        className="w-10 mt-24 ml-6 flex gap-2 font-nova-square"
        to="/community"
      >
        <img className="h-5 self-center" src={leftArrowIcon} />
        Back
      </Link>

      {/* Background image with opacity */}
      <div
        className="absolute inset-0 w-full h-full bg-repeat bg-left-top opacity-10 pointer-events-none"
        style={{ backgroundImage: `url(${geoBg})` }}
      />

      {/* Post */}
      <div className="mt-4 md:-mt-6 flex justify-center">
        <div className="w-96 max-w-[90%] md:w-9/12">
          <CommunityPost
            key={COMMUNITY_POST.id}
            author={COMMUNITY_POST.author}
            profilePicture={COMMUNITY_POST.profilePicture}
            dateCreated={COMMUNITY_POST.dateCreated}
            tags={COMMUNITY_POST.tags}
            title={COMMUNITY_POST.title}
            text={COMMUNITY_POST.text}
            cover={COMMUNITY_POST.cover}
            media={COMMUNITY_POST.media}
          />
        </div>
      </div>

      {/* Reply Bar */}
      <div className="mt-4 flex justify-center">
        <div className="w-96 max-w-[90%] md:w-9/12 relative">
          <input
            type="text"
            placeholder="Reply to Post"
            className="w-full px-4 py-2 pr-24 rounded-lg font-nova-square text-light-grey italic placeholder-light-grey focus:outline-none focus:ring-0 focus:border-light-grey"
          />
          <button className="absolute top-[6px] right-2 px-4 py-2 md:px-7 bg-accent-yellow text-dark-purple font-nova-square rounded-lg">
            Reply
          </button>
        </div>
      </div>

      {/* Post Replies */}
      <div className="mt-6 flex flex-col items-center">
        <div className="w-96 max-w-[90%] md:w-9/12">
          {COMMUNITY_POST.replies.map((reply) => (
            <div key={reply.id} className="border-t border-light-grey pt-4">
              <CommunityReply
                author={reply.author}
                profilePicture={reply.profilePicture}
                dateCreated={reply.dateCreated}
                text={reply.text}
                subreplies={reply.replies}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommunityPostPage;
