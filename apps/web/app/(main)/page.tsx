import { LeftSidebar, RightSidebar } from "@repo/ui/layouts";
import { FeedArea } from "@repo/ui/videos";

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">

      {/* Vùng nội dung 3 cột */}
      <div className="flex flex-1 justify-center gap-4 px-4 py-6 max-w-7xl mx-auto w-full">
        {/* Cột trái */}
        <aside className="hidden md:block w-1/4">
          <LeftSidebar />
        </aside>

        {/* Cột giữa */}
        <section className="flex-1 max-w-2xl">
          <FeedArea />
        </section>

        {/* Cột phải */}
        <aside className="hidden md:block w-1/4">
          <RightSidebar />
        </aside>
      </div>
    </main>
  );
}
