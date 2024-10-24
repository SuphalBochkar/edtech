import PracticeTestCard from "@/components/Tests/PracticeTestCard";
import { getPracticeTestsData } from "@/actions/keyData";

export default async function PracticeTestsPage() {
  const practiceTestsData = await getPracticeTestsData();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Practice Tests</h2>
      <div defaultValue="analytical">
        <div>
          <div>Analytical</div>
          <div>Verbal</div>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(practiceTestsData.analytical).map(
              ([title, testId]) => (
                <PracticeTestCard key={testId} title={title} testId={testId} />
              )
            )}
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(practiceTestsData.verbal).map(([title, testId]) => (
              <PracticeTestCard key={testId} title={title} testId={testId} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
