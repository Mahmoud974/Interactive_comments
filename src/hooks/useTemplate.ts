import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchElements = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

const postElement = async (data: any) => {
  const response = await axios.post("http://localhost:3000/api/post", data);
  console.log(response);

  return response.data;
};

export const useTemplate = () => {
  return useQuery({
    queryKey: ["get-template"],
    queryFn: () => fetchElements("http://localhost:3000/api/conv"),
  });
};

export const usePostTemplate = () => {
  const queryClient = useQueryClient(); // Pour invalider ou rafraîchir les données après le POST

  return useMutation({
    mutationFn: postElement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-template"] });
    },
  });
};
