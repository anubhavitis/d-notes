"use client";
import Notes from "@/components/notes";
import Login from "../components/login";

import GUN from "gun";
import "gun/sea";

export default function Home() {
  const gun = GUN({
    peers: ['https://gun-manhattan.herokuapp.com/gun']
  });
  const user = gun.user().recall({ sessionStorage: true });

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1 className="text-4xl font-bold mb-8">D-Notes</h1>
      <div>
        <Login user={user} />
        <Notes gun={gun} />
      </div>
    </div>
  );
}
