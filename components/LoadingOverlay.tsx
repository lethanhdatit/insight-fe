export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 w-screen h-screen z-[9999] bg-[rgba(107,70,193,0.18)] flex items-center justify-center select-none cursor-wait backdrop-blur-sm mystical-font">
      {/* <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full border-4 border-[var(--mystical-purple)] border-t-transparent loading-orb mystical-glow mb-4" />
        <div className="text-xl text-[var(--mystical-purple)] mystical-text-glow font-semibold drop-shadow">
          Đang tải...
        </div>
      </div> */}
    </div>
  );
}