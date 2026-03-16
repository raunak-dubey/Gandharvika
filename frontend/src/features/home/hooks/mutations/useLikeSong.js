import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeSong } from "../../api/song.api";

const useLikeSong = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likeSong,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likedSongs"] });
      queryClient.invalidateQueries({ queryKey: ["recommendations"] });
    }
  });
};

export default useLikeSong;