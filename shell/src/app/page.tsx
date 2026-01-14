import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold">Next.js Shell</h1>
        <br />
        <Link href="/service-a">Service A</Link>
      </main>
    </>
  );
}
