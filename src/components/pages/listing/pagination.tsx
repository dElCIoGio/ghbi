import { Button } from "@/components/ui/button";
import { useProductsListingContext } from "@/context/listing-context";

export function Pagination() {
    const { filteredProducts, currentPage, setCurrentPage, productsPerPage } = useProductsListingContext();

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    if (filteredProducts.length === 0) return null;

    const prevPage = () => {
        const num = Math.max(currentPage - 1, 1)
        setCurrentPage(num)
    }

    const nextPage = () => {
        const num = Math.min(currentPage + 1, totalPages)
        setCurrentPage(num)
    }

    return (
        <div className="flex items-center justify-center space-x-2 py-8">
            <Button
                variant="outline"
                size="sm"
                onClick={() => prevPage()}
                disabled={currentPage === 1}
            >
                Previous
            </Button>
            <div className="flex items-center space-x-1">
                {[...Array(totalPages)].map((_, i) => (
                    <Button
                        key={`page-${i + 1}`}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        size="sm"
                        className="w-8 h-8 p-0"
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </Button>
                ))}
            </div>
            <Button
                variant="outline"
                size="sm"
                onClick={() => nextPage()}
                disabled={currentPage === totalPages}
            >
                Next
            </Button>
        </div>
    );
} 