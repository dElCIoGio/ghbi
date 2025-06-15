import {useQuery} from "@tanstack/react-query";
import {getProductByHandle, getProducts} from "@/lib/shopify/products";


export const useGetProducts = () => {

    const queryKey = ["products"]

    const {
        data,
        ...query
    } = useQuery({
        queryKey,
        queryFn: getProducts
    })

    return {
        data: data? data : [],
        ...query
    }

}

export const useGetProductByHandle = (handle: string) => {

    const queryKey = ["products", handle]

    return useQuery({
        queryKey,
        queryFn: () => getProductByHandle(handle)
            .then(product => product)
    })

}


