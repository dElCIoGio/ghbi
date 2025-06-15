import type {Product} from "@/types/product";
import {createContext, useContext} from "react";

interface ProductContextProps {
    product: Product
}

export const ProductContext = createContext<ProductContextProps | undefined>(undefined)

export function useProductContext() {

    const context = useContext(ProductContext)

    if (!context) {
        throw new Error("useProductContext must be used within a ProductProvider")
    }

    return context

}