function ProgressBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="mb-5">
      <div className="mb-2 flex justify-between">
        <span>{label}</span>
        <span>{value}%</span>
      </div>

      <div className="h-3 rounded-full bg-gray-200">
        <div
          className="h-3 rounded-full bg-black"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function ProgressCard() {
  return (
    <div className="rounded-xl border p-6 shadow-sm bg-white">
      <h2 className="mb-5 text-xl font-semibold">
        Training Progress
      </h2>

      <ProgressBar label="Memory" value={10} />
      <ProgressBar label="Observation" value={0} />
      <ProgressBar label="Mentalism" value={0} />
    </div>
  );
}