import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Next.js Shell</h1>
        <div id="service-a-root"></div>
        <br />
        <Link href="/services">All Services</Link>
      </main>
    </>
  );
}
