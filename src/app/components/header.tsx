"use client";
import AgricultureSharpIcon from "@mui/icons-material/AgricultureSharp";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-yellow-100 px-10">
      <div className="flex items-center gap-5 border-2 border-success rounded-md p-2 bg-green-800 hover:bg-green-700 hover:shadow-md">
        <Link className="text-4xl font-bold gap-10 flex items-center" href="/">
          <AgricultureSharpIcon sx={{ color: "#fff", height: 60, width: 60 }} />
          <h1 className="flex items-center text-white">Bob's Corn</h1>
        </Link>
      </div>
      <div>
        <p>burger menu</p>
        {/* add menu burger */}
      </div>
    </header>
  );
}
