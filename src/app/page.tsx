"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { useMsalInstance } from "../onedriveAuth";
import { db } from "../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const msalInstance = useMsalInstance();

  // OneDrive login handler
  const handleLogin = async () => {
    try {
      const loginResponse = await msalInstance.loginPopup({
        scopes: ["Files.Read", "User.Read"],
      });
      setUser(loginResponse.account);
      // Fetch playlists from Firebase
      fetchPlaylists(loginResponse.account?.username);
    } catch (err) {
      alert("Login failed: " + err);
    }
  };

  // Fetch playlists from Firebase
  const fetchPlaylists = async (username: string) => {
    setLoading(true);
    try {
      const docRef = doc(collection(db, "Onedrive-video-player"), username);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPlaylists(docSnap.data().playlists || []);
      } else {
        setPlaylists([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Placeholder for video list UI
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 style={{ color: "var(--accent)", fontWeight: "bold" }}>
          YouTube-like OneDrive Video Player
        </h1>
        {!user ? (
          <button
            style={{
              background: "var(--accent)",
              color: "#fff",
              border: "none",
              padding: "1rem 2rem",
              borderRadius: 8,
              fontSize: "1.2rem",
              cursor: "pointer",
              margin: "2rem 0",
            }}
            onClick={handleLogin}
          >
            Log in with OneDrive
          </button>
        ) : (
          <>
            <p>Welcome, {user.username}!</p>
            <h2>Your Playlists</h2>
            {loading ? (
              <p>Loading playlists...</p>
            ) : playlists.length === 0 ? (
              <p>No playlists found.</p>
            ) : (
              <ul>
                {playlists.map((pl, idx) => (
                  <li key={idx}>{pl.title || "Untitled Playlist"}</li>
                ))}
              </ul>
            )}
          </>
        )}
      </main>
    </div>
  );
}
