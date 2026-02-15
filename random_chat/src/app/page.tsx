'use client'
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AnimatePresence, motion } from 'motion/react'
import { Globe, LoaderPinwheel, Shuffle, Sparkle, Video } from 'lucide-react'
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import VideoRoom from "@/components/VideoRoom";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  transports: ["websocket"]
});



export default function Home() {

  const [status, setStatus] = useState("idle");
  const [roomId, setRoomId] = useState("");

  const startChat = () => {
    socket.emit("start");
    setStatus("waiting");
  }

  const next = () => {
    socket.emit("next");
    window.location.reload();
  }

  useEffect(() => {
    socket.on("matched", ({ roomId }) => {
      setRoomId(roomId);
      setStatus("chatting");
      console.log("Room Id : ", roomId);
    });

    socket.on("waiting", () => {
      setStatus("waiting");
    });

    socket.on("partnerLeft", () => {
      window.location.reload();
    });

    return () => {
      socket.off();
    }
  }, [])

  return (
    <>
      <Navbar show={status !== "chatting"} />
      <main className="relative w-full bg-linear-to-r from-black via-zinc-900 to-black text-white overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <AnimatePresence>
          {status === "idle" && (
            <motion.div
              key="idle"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center"
            >
              <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur border border-white/10">
                <Sparkle size={32} color="white" />
              </div>
              <div className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">Ramdom Chat</div>
              <p className="text-zinc-400 max-w-md mb-8 text-sm sm:text-base">Anonymous video conversation with strangers worldwide. No Sign-Up, No Identity, Just pure connection.</p>

              <motion.button
                whileHover={{ scale: 1.09 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-linear-to-r from-white to-zinc-200 text-black font-semibold text-lg shadow-xl cursor-pointer"
                onClick={startChat}
              >
                <Video size={30} aria-hidden="true" /> Start Anonymous chat
              </motion.button>
            </motion.div>
          )}
          {status === "waiting" && (
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 1 }}
              className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center"
            >
              <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur border border-white/10">
                {/* <Sparkle size={32} color="white" /> */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 1.5 }}
                >
                  <LoaderPinwheel size={56} />
                </motion.div>
              </div>
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 1.2 }}
                className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
                Waiting for a match...
              </motion.div>
              <p className="text-zinc-400 max-w-md text-sm sm:text-base">We are connecting you with someone. Please keep this tab open.</p>
            </motion.div>
          )}

          {
            status === "chatting" && roomId && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="fixed inset-0 flex flex-col bg-black z-20"
              >
                <div className="flex items-center justify-between px-4 sm:px-6 py-2 bg-black/50 backdrop-blur border-b border-white/10">
                  <div className="flex items-center gap-2 text-zinc-400 text-sm">
                    <Globe size={16} /> Random Chat | Connected
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.09 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 text-white font-medium cursor-pointer"
                    onClick={next}
                  >
                    <Shuffle size={16} />
                    Next
                  </motion.button>
                </div>
                <div className="flex-1 relative">
                  <VideoRoom roomId={roomId} />
                </div>
              </motion.div>
            )
          }

        </AnimatePresence>
      </main>
      {status !== "chatting" && <Footer />}
    </>
  );
}
