import axios from "axios";
import { useEffect, useState } from "react"
import Loader from "../../src/components/loader";
import ProductCard from "../../src/components/productcard";
import SearchBox from "../../src/components/searchBox";

export default function ProductsPage() {
    const [productList, setProductList] = useState([]);
    const [productsLoaded, setProductsLoaded] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(
    ()=>{
      if(!productsLoaded){
        
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product").then(
        (response) => {
          setProductList(response.data);
          setProductsLoaded(true);
        }
      )

      }

},[productsLoaded]
)

function searchProducts() {
  axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/search?q=" + search)
    .then((response) => {
      setProductList(response.data.products);
      setProductsLoaded(true);
    })
    .catch((error) => {
      console.error("Error searching products:", error);
      setProductsLoaded(true);
    });
}

function handleReset() {
  setSearch("");
  setProductsLoaded(false);
}

    return (
        <div className="w-full h-full">

          <SearchBox 
          search={search} 
          setSearch={setSearch} 
          onSearch={searchProducts} 
          onReset={handleReset}/>
              {
                  productsLoaded?
                  <div className= "w-full h-full flex flex-wrap justify-center">
                    {
                        productList.map((product)=>{
                            return(
                             <ProductCard key={product.productId} product={product}/>
                            )
                        })
                    }

                  </div>:
                  <Loader/>
              }
                      
        </div>
    )
}