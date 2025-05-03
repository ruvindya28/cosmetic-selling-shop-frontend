import { Link } from "react-router-dom";

export default function AddProductForm() {
    return (
        <div className="w-full h-full rounded-lg flex justify-center items-center">
            <div className="w-[600px] h-[700px] rounded-lg shadow-lg flex flex-col items-center p-10 relative">
                <h1 className="text-3xl font-bold text-gray-700 m-[10px]">Add Product</h1>

                <input 
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" 
                    placeholder="Product ID" 
                />
                <input 
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" 
                    placeholder="Product Name" 
                />
                <input 
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" 
                    placeholder="Alternate Names" 
                />
                <input 
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" 
                    placeholder="Price" 
                />
                <input 
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" 
                    placeholder="Labelled Price" 
                />
                <textarea
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" 
                    placeholder="Description" 
                />
                <input 
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" 
                    placeholder="Stock" 
                />
                <div className="w-[400px] h-[100px] flex justify-between items-center">
                    <Link 
                        to="/admin/products" 
                        className="bg-red-500 text-white p-[10px] w-[200px] text-center rounded-lg cursor-pointer hover:bg-red-600 hover:text-white"
                    >
                        Cancel
                    </Link>
                    <button className="bg-green-500 text-white p-[10px] w-[200px] ml-[10px] text-center rounded-lg cursor-pointer hover:bg-green-600 hover:text-white">Add Product</button>
                </div>
            </div>
        </div>
    );
}
