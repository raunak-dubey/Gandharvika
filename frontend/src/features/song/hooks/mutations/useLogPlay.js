import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logSongPlay } from "../../api/history.api";

const useLogPlay = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ songId, mood }) => logSongPlay(songId, mood),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
      queryClient.invalidateQueries({ queryKey: ["recommendations"] });
    }
  });
};

export default useLogPlay;