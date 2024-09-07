import { useQuery } from "@tanstack/react-query";



export function useQueryFn(queryKey, queryFn) {

    return useQuery({
        queryKey: [queryKey], queryFn
 })

}