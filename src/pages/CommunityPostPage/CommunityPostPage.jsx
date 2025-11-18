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
      parentId: null,
      replyThreadParentId: null,
      author: "Lior Mizrahi",
      profilePicture: "/images/profiles/lior.jpg",
      dateCreated: "June 13, 2025",
      text: "This is a beautiful song!",
    },
    {
      id: 201,
      parentId: 101,
      replyThreadParentId: 101,
      author: "Samira Khan",
      profilePicture: "/images/profiles/samira.jpg",
      dateCreated: "June 14, 2025",
      text: "Especially the harmony around 1:20!",
    },
    {
      id: 202,
      parentId: 201,
      replyThreadParentId: 101,
      author: "James Earnest",
      profilePicture: "/images/profiles/james.jpg",
      dateCreated: "June 18, 2025",
      text: "I had the same thought!",
    },
    {
      id: 102,
      parentId: null,
      replyThreadParentId: null,
      author: "Takeshi Nakamura",
      profilePicture: "/images/profiles/takeshi.jpg",
      dateCreated: "June 13, 2025",
      text: "I can almost hear this played on the shamisen. Inspiring.",
    },
  ],
};

function CommunityPostPage() {
  return (
    <div className="min-h-screen bg-main-off-black text-light-grey ">
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
            media={COMMUNITY_POST.media}
          />
        </div>
      </div>

      {/* Reply Bar */}
      <div className="mt-4 flex justify-center">
        <div className="w-96 max-w-[90%] md:w-9/12 relative p-1 border border-main-midtone">
          <input
            type="text"
            placeholder="Reply to Post"
            style={{
              background: "linear-gradient(to right, #EFECE6, #DDD0B9)",
              margin: 0, // ensures no default margin from user-agent stylesheet
            }}
            className="block w-full px-4 py-2 pr-24 font-nova-square text-multi-off-black italic placeholder-main-off-black focus:outline-none focus:ring-0 focus:border-light-grey rounded-none leading-none"
          />
          <button className="absolute top-[10px] right-3 px-4 py-2 md:px-7 bg-main-accent text-dark-purple font-nova-square rounded-none">
            Reply
          </button>
        </div>
      </div>

      {/* Post Replies */}
      <div className="mt-6 flex flex-col items-center">
        <div className="w-96 max-w-[90%] md:w-9/12">
          {COMMUNITY_POST.replies
            .filter((r) => r.parentId === null)
            .map((reply) => (
              <div key={reply.id} className="border-t border-light-grey pt-4">
                <CommunityReply
                  key={reply.id}
                  reply={reply}
                  allReplies={COMMUNITY_POST.replies}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CommunityPostPage;
