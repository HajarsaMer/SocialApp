import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useMutatinPosts(fn) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: fn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        }
    })
}