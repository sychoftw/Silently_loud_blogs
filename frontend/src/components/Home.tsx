import { Link } from "react-router-dom";

export default function Home() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-5xl font-bold text-black text-center px-8">
        Every great blog starts with a single thought. Write fearlessly, edit ruthlessly, and share generously.
        </h1>
        <Link to={`/signup`}>
        <button className="mt-6 px-6 py-3 bg-black text-white text-lg rounded-lg hover:bg-gray-800 transition-all duration-300">
          Create Your Blog
        </button>
        </Link>
      </div>
    );
  }
  