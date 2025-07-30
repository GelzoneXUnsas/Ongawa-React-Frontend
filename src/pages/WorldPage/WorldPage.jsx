import { useNavigate } from "react-router-dom";

export default function BeatmapPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-6 bg-beatmaps-background min-h-screen text-white mt-16 flex flex-col items-center justify-center">
      <span
        role="button"
        onClick={handleBack}
        className="mb-10 flex items-center text-lg font-medium cursor-pointer"
      >
        <span className="text-yellow-accent">◄ Back</span>
      </span>

      <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">🚧 Under Construction</h1>
      <p className="text-gray-400 text-center max-w-xl">
        This page is currently being built. Please check back soon for more updates!
      </p>
    </div>
  );
}
