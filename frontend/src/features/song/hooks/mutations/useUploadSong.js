import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadSong } from "../../api/song.api";

const useUploadSong = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file, mood, tags }) => uploadSong(file, mood, tags),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["songs"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["recommendations"] });
    }
  });
};

export default useUploadSong;