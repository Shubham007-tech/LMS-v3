import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useParams } from 'react-router-dom';

function UdemyClone() {
  const { categoryId } = useParams();
  const [videos, setVideos] = useState([]); // Video list fetched from the server
  const [currentVideo, setCurrentVideo] = useState(null); // Currently selected video

  // Helper function to extract video ID from YouTube short URL
  const getVideoId = (url) => {
    const match = url.split("/").pop(); // Get the part after "youtu.be/"
    return match ? match : null;
  };
  
  useEffect(() => {
    // Fetch videos based on categoryId
    fetch(`http://localhost:5000/api/videos?search=${categoryId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        return response.json();
      })
      .then((data) => {
        setVideos(data);
        if (data.length > 0) {
          setCurrentVideo(data[0]); // Set the first video as the default
        }
      })
      .catch((error) => console.error('Error fetching videos:', error));
  }, [categoryId]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar with video list */}
      <div
        style={{
          width: "30%",
          backgroundColor: "#f8f8f8",
          overflowY: "scroll",
          padding: "1rem",
        }}
      >
        <h2>Video List</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {videos.map((video) => (
            <li
              key={video._id}
              onClick={() => setCurrentVideo(video)}
              style={{
                margin: "1rem 0",
                cursor: "pointer",
                padding: "10px",
                backgroundColor:
                  currentVideo && currentVideo._id === video._id ? "#e0e0e0" : "#fff",
                borderRadius: "5px",
              }}
            >
              <h4>{video.title}</h4>
              <p style={{ color: "#666", fontSize: "0.9rem" }}>
                {video.description.substring(0, 50)}...
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Main video player */}
      <div style={{ flex: 1, padding: "1rem" }}>
        {currentVideo ? (
          <>
            <h2>{currentVideo.title}</h2>
            <div>
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${getVideoId(currentVideo.youtubeUrl)}`}
                playing={true}
                controls={true}
                playbackRate={1.25}
                width="100%"
                height="500px"
              />
            </div>
            <p style={{ marginTop: "1rem" }}>{currentVideo.description}</p>
          </>
        ) : (
          <p>No video selected or available in this category.</p>
        )}
      </div>
    </div>
  );
}

export default UdemyClone;
