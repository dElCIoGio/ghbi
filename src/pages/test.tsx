import {useGetProductByHandle} from "@/hooks/shopify/products";

function Test() {

    const {
        data
    } = useGetProductByHandle("luxe-deep-wave-wig")

    console.log(data)

    return (
        <div></div>
    );
}

export default Test;