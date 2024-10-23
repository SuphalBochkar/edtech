import Link from "next/link";

type PracticeTestCardProps = {
  title: string;
  testId: string;
};

export default function PracticeTestCard({
  title,
  testId,
}: PracticeTestCardProps) {
  return (
    <div className="hover:shadow-lg transition-shadow">
      <div>
        <div>{title}</div>
      </div>
      <div>
        <Link
          href={`/practice-test/${testId}`}
          className="text-blue-500 hover:underline"
        >
          Start Test
        </Link>
      </div>
    </div>
  );
}
