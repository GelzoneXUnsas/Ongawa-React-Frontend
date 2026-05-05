import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getPost } from "../../services/postService";
import { getComments, createComment } from "../../services/commentService";

import CommunityPost from "../../components/CommunityPost/CommunityPost";
import CommunityReply from "../../components/CommunityReply/CommunityReply";

import leftArrowIcon from "../../assets/icons/leftArrowIcon.png";
import geoBg from "../../assets/images/backgrounds/geo_bg.png";

function CommunityPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (!id) return;
    getPost(id).then(setPost).catch(() => {});
  }, [id]);

  useEffect(() => {
    if (!id) return;
    getComments(`POST#${id}`)
      .then(setComments)
      .catch(() => {});
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    try {
      const newComment = await createComment({ entityPK: `POST#${id}`, text: commentText });
      setComments(prev => [newComment, ...prev]);
      setCommentText("");
    } catch (err) {
      // silent fail
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-main-off-black text-light-grey flex items-center justify-center">
        <p className="font-nova-square text-light-grey">Loading...</p>
      </div>
    );
  }

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
            key={post.id}
            author={post.author}
            profilePicture={post.profilePicture}
            dateCreated={post.dateCreated}
            tags={post.tags}
            title={post.title}
            text={post.text}
            media={post.media}
          />
        </div>
      </div>

      {/* Reply Bar */}
      <div className="mt-4 flex justify-center">
        <div className="w-96 max-w-[90%] md:w-9/12 relative p-1 border border-main-midtone">
          <input
            type="text"
            placeholder="Reply to Post"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit()}
            style={{
              background: "linear-gradient(to right, #EFECE6, #DDD0B9)",
              margin: 0,
            }}
            className="block w-full px-4 py-2 pr-24 font-nova-square text-multi-off-black italic placeholder-main-off-black focus:outline-none focus:ring-0 focus:border-light-grey rounded-none leading-none"
          />
          <button
            onClick={handleCommentSubmit}
            className="absolute top-[10px] right-3 px-4 py-2 md:px-7 bg-main-accent text-dark-purple font-nova-square rounded-none"
          >
            Reply
          </button>
        </div>
      </div>

      {/* Post Replies */}
      <div className="mt-6 flex flex-col items-center">
        <div className="w-96 max-w-[90%] md:w-9/12">
          {comments.length === 0 ? (
            <p className="text-light-grey font-nova-square text-sm">Be the first to reply!</p>
          ) : (
            comments
              .filter((r) => r.parentId === null)
              .map((reply) => (
                <div key={reply.id} className="border-t border-light-grey pt-4">
                  <CommunityReply
                    key={reply.id}
                    reply={reply}
                    allReplies={comments}
                  />
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CommunityPostPage;
