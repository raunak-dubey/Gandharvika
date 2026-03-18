import { useQuery } from "@tanstack/react-query";
import { fetchMoodLogs } from "../../api/mood.api";

const useMoodLogs = () => {
  return useQuery({
    queryKey: ["moodLog"],
    queryFn: fetchMoodLogs
  });
};

export default useMoodLogs;