import VideoCard from "../VideoCard/VideoCard";

export default function VideoList({ videos }) {
  return videos.map((video) => {
    return (
      <div key={video._id}>
        <VideoCard video={video} />
      </div>
    );
  });
}
