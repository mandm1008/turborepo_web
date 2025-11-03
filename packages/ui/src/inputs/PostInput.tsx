"use client";

import { useState, useRef } from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
} from "@floating-ui/react";
import { FaVideo, FaTimes, FaPaperPlane, FaLink } from "react-icons/fa";
import { useSession } from "next-auth/react";

export default function PostInput({ onPosted }: { onPosted?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const { data: session } = useSession();
  const user = session?.user;

  const inputFileRef = useRef<HTMLInputElement>(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(8), flip(), shift()],
    placement: "bottom-start",
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setYoutubeUrl("");
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleYoutubeChange = (url: string) => {
    setYoutubeUrl(url);
    setVideoFile(null);
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoIdMatch =
        url.match(/v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/);
      const videoId = videoIdMatch ? videoIdMatch[1] : null;
      if (videoId) {
        setPreview(`https://www.youtube.com/embed/${videoId}`);
      }
    } else {
      setPreview(null);
    }
  };

  const handlePost = async () => {
    if (!caption && !videoFile && !youtubeUrl)
      return alert("Hãy nhập nội dung hoặc video!");

    const formData = new FormData();
    formData.append("caption", caption);
    if (videoFile) formData.append("video", videoFile);
    if (youtubeUrl) formData.append("youtubeUrl", youtubeUrl);

    const res = await fetch("/api/videos", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setCaption("");
      setVideoFile(null);
      setYoutubeUrl("");
      setPreview(null);
      setIsOpen(false);
      alert("✅ Đăng bài thành công!");
      onPosted?.();
    } else {
      alert("❌ Lỗi khi đăng bài!");
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow p-4 mb-6 text-white">
      <div className="flex items-center gap-3">
        <img
          src={user?.avatar || "https://i.pravatar.cc/40?u=default"}
          alt="me"
          className="w-10 h-10 rounded-full"
        />

        {/* Trigger input */}
        <input
          {...getReferenceProps({
            ref: refs.setReference,
          })}
          onClick={() => setIsOpen(true)}
          placeholder="Đăng cảm nghĩ hoặc video..."
          readOnly
          className="flex-1 rounded-full bg-gray-800 px-4 py-2 outline-none cursor-pointer"
        />
      </div>

      {/* Popup */}
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="bg-white text-black p-4 rounded-xl shadow-lg mt-2 w-[420px] z-50"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-lg">Tạo bài viết</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>

          {/* Caption */}
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Bạn đang nghĩ gì?"
            className="w-full h-24 border border-gray-300 rounded-md p-2 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* YouTube URL */}
          <div className="flex items-center mt-2 gap-2">
            <FaLink className="text-blue-600" />
            <input
              type="text"
              placeholder="Dán link YouTube (tùy chọn)"
              value={youtubeUrl}
              onChange={(e) => handleYoutubeChange(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Preview */}
          {preview && (
            <div className="mt-3">
              {youtubeUrl ? (
                <iframe
                  src={preview}
                  className="w-full h-48 rounded-md"
                  allowFullScreen
                />
              ) : (
                <video src={preview} controls className="w-full rounded-md" />
              )}
            </div>
          )}

          {/* Actions */}
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => inputFileRef.current?.click()}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              <FaVideo className="text-blue-600" /> Tải video
            </button>
            <button
              onClick={handlePost}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <FaPaperPlane /> Đăng
            </button>
          </div>

          <input
            ref={inputFileRef}
            type="file"
            accept="video/*"
            hidden
            onChange={handleFileSelect}
          />
        </div>
      )}
    </div>
  );
}
