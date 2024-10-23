import Link from "next/link";

type LevelCardProps = {
  level: string;
  type: string;
  tests: Record<string, string>;
};

export default function LevelCard({ level, type, tests }: LevelCardProps) {
  return (
    <div className="hover:shadow-lg transition-shadow">
      <div>
        <div>
          Level {level} - {type}
        </div>
        <div>Select a test to begin</div>
      </div>
      <div>
        <ul className="space-y-2">
          {Object.entries(tests).map(([testNumber, testId]) => (
            <li key={testId}>
              <Link
                href={`/test/${level}/${type.toLowerCase()}/${testNumber}`}
                className="text-blue-500 hover:underline"
              >
                Test {testNumber}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
