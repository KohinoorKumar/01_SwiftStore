import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createProductApi, deleteProductApi, getAllProductsApi, getMyProductsApi, getProductApi, updateProductApi } from "../api/productsApi"


export const useAllProducts = () => {

    const {data, isPending, error, refetch} = useQuery({
        queryKey: ["products"],
        queryFn: getAllProductsApi,
        // TRANSFORM OPTION: Unwraps the nested structure immediately
        select: (response) => response?.data?.products || []
    })

    // console.log("products data", data)

    return {
        data, 
        isPending,
        error,
        refetch
    }

}

export const useCreateProduct = () => {
    return useMutation({
        mutationFn: createProductApi,
    })
}

export const useMyProducts = () => {
  return useQuery({
    queryKey: ["my-products"],
    queryFn: getMyProductsApi,
  });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProductApi,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["my-products"]
            })

            queryClient.invalidateQueries({
                queryKey: ["products"]
            })
        }
    })
}

export const useProduct = (id) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductApi(id),
        enabled: Boolean(id)
    })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductApi,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["my-products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["product", variables.id],
      });
    },
  });
};