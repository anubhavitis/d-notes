"use client";
import Notes from "@/components/notes";
import Login from "../components/login";

import GUN from "gun";
import "gun/sea";

import { useState, useEffect } from "react";

export default function Home() {
  const gun = GUN({
    peers: ['https://gun-manhattan.herokuapp.com/gun']
  });
  const user = gun.user().recall({ sessionStorage: true });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    gun.on('auth', function (e) {
      console.log("user auth successfull")
      setIsAuthenticated(true);
    });
  }, []);


  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1 className="text-4xl font-bold mb-8">D-Notes</h1>
      <div>
        <Login user={user} gun={gun} isAuthenticated={isAuthenticated} />
        <Notes gun={gun} isAuthenticated={isAuthenticated} />
      </div>
    </div>
  );
}
