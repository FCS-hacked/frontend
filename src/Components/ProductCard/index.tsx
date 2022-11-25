 // @ts-nocheck 

const ProductCard = ({ product }) => (
    <div className="bg-white col-span-4 shadow-md px-3 py-3">
      <img src={product.image_url} alt="Product Image" height={200} width={200} className="mx-auto mb-3 h-[200px] w-auto"/>
      <div>
        <h4 className="text-lg font-bold mb-7 min-h-[4rem]">{product.name}</h4>
        <div className="grid grid-cols-12 gap-3 text-sm my-2">
          <div className="col-span-6">
            <span className="font-bold">Price:</span> {product.price}
          </div>
          <div className="col-span-6">
            <span className="font-bold">Stock:</span> {product.stock}
          </div>
        </div>
        <a className="block text-center btn-outline w-full my-4" href={`/demo/product-detail/${product.id}`}>View Details</a>
      </div>
    </div>
)
export default ProductCard;