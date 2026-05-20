interface ScoreDotsProps {
  score: number;
  max?: number;
  color?: "blue" | "emerald" | "amber";
}

export default function ScoreDots({
  score,
  max = 5,
  color = "blue",
}: ScoreDotsProps) {
  const colorMap = {
    blue: "bg-blue-500",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full transition-colors ${
            i < score ? colorMap[color] : "bg-slate-200"
          }`}
        />
      ))}
    </div>
  );
}
