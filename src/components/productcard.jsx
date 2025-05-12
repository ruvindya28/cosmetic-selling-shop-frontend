import { Link } from "react-router-dom"


export default function ProductCard(props) {

    const product = props.product

    return(
        <Link to={"/overview/"+product.productId} className="w-[250px] m-4 h-[350px] bg-gray-200">
            <img className="w-full h-[220px] object-cover" src={product.image[0]}/>
            <div className="h-[110px] w-full flex justify-center flex-col p-5 px-6">
                <p className="text-gray-400">{product.productId}</p>
                <p className="text-lg font-semi-bold">{product.name}</p>
                <p className="text-lg text-pink-400">{product.price.toFixed(2)} <span className="line-through text-gray-400 text-sm">{product.price<product.labeledPrice && product.labeledPrice.toFixed(2)}</span></p>
            </div>
        
        </Link>
    )
}