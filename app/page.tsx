import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      Click{" "}
      <Link href="/documents/123" className="ml-2 font-bold text-blue-500">
        here{" "}
      </Link>
      <span> </span> &nbsp; to view the documents page.
    </div>
  );
}
