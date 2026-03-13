export const computeHistoryStats = (history = []) => {
  const stats = {
    totalPlays: history.length,
    moodCount: {},
    artistCount: {},
    topArtist: null,
    favoriteMood: null
  };

  history.forEach((item) => {
    const { song, mood } = item;

    // mood stats
    if (mood) {
      stats.moodCount[mood] = (stats.moodCount[mood] || 0) + 1;
    }

    // artist stats
    if (song?.artist) {
      stats.artistCount[song.artist] =
        (stats.artistCount[song.artist] || 0) + 1;
    }
  });

  // top artist
  stats.topArtist = Object.entries(stats.artistCount)
    .sort((a, b) => b[1] - a[1])[0]?.[0];

  // favorite mood
  stats.favoriteMood = Object.entries(stats.moodCount)
    .sort((a, b) => b[1] - a[1])[0]?.[0];

  return stats;
};