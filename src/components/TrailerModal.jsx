import { motion, AnimatePresence } from "framer-motion";

const getYouTubeEmbedUrl = (url) => {
  if (!url) return "";

  // If already an embed URL, just return
  if (url.includes("/embed/")) return url;

  try {
    const u = new URL(url);

    // youtu.be/<id>
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${id}`;
    }

    // youtube.com/watch?v=<id>
    if (u.searchParams.get("v")) {
      const id = u.searchParams.get("v");
      return `https://www.youtube.com/embed/${id}`;
    }
  } catch (e) {
    // If URL constructor fails, just return original
    return url;
  }

  return url;
};

const TrailerModal = ({ isOpen, onClose, trailerUrl }) => {
  if (!isOpen || !trailerUrl) return null;

  const embedUrl = getYouTubeEmbedUrl(trailerUrl);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
            >
              ✕
            </button>

            <div className="aspect-video">
              <iframe
                src={embedUrl}
                title="Trailer"
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Fallback open-on-YouTube link in case video shows "Unavailable" */}
            <div className="mt-3 text-right">
              <a
                href={trailerUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-gray-300 underline hover:text-white"
              >
                Having issues? Open trailer on YouTube
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TrailerModal;
