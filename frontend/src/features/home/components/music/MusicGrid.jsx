import MusicCard from "./MusicCard";
import "../../styles/music-grid.scss";

const mockSongs = [
  { id: 1, title: "Banda Kaam Ka", artist: "Chaar Diwari" },
  { id: 2, title: "Kodak", artist: "King & Seedhe Maut" },
  { id: 3, title: "Iss Tarah", artist: "Chaar Diwari & Sonu Nigam" },
  { id: 4, title: "Nanchaku", artist: "Seedhe Maut & MC Stan" },
];

const MusicGrid = () => {
  return (
    <section className="music-grid">

      <h2 className="section-title">Recommended</h2>

      <div className="music-list">
        {mockSongs.map((song) => (
          <MusicCard key={song.id} song={song} />
        ))}
      </div>

    </section>
  );
};

export default MusicGrid;