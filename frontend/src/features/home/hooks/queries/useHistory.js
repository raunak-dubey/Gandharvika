import { useQuery } from "@tanstack/react-query";
import { fetchHistory } from "../../api/history.api";

const useHistory = () => {
  return useQuery({
    queryKey: ["history"],
    queryFn: fetchHistory
  });
};

export default useHistory;