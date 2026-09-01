import Header from "@/components/Header";
import TrainingCard from "@/components/TrainingCard";
import ProgressCard from "@/components/ProgressCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">

      <div className="mx-auto max-w-5xl">

        <Header />

        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">
            Day 1 / 90
          </h2>

          <p className="mt-2 text-gray-600">
            Build your mentalist foundation.
          </p>
        </div>


        <div className="grid gap-6 md:grid-cols-2">

          <TrainingCard />

          <ProgressCard />

        </div>


        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">
            Recent Sessions
          </h2>

          <p className="mt-3 text-gray-500">
            No training sessions yet.
          </p>
        </div>

      </div>

    </main>
  );
}