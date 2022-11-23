 // @ts-nocheck 

const ProductCard = ({ product }) => (
    <div className="bg-white col-span-4 shadow-md px-3 py-3">
      <img src={product.image} alt="Product Image" height={200} width={200} className="mx-auto mb-3 h-[200px] w-auto"/>
      <div>
        <h4 className="text-lg font-bold mb-7 min-h-[4rem]">{product.name}</h4>
        <div className="grid grid-cols-12 gap-3 text-sm my-2">
          <div className="col-span-6">
            <span className="font-bold">Brand:</span> {product.brand}
          </div>
          <div className="col-span-6">
            <span className="font-bold">Fits:</span> {product.fits}
          </div>
          <div className="col-span-6">
            <span className="font-bold">Gauge:</span> {product.gauge}
          </div>
          <div className="col-span-6">
            <span className="font-bold">Catheter:</span> {product.catheter}
          </div>
          <div className="col-span-6">
            <span className="font-bold">Length:</span> {product.length}
          </div>
          <div className="col-span-6">
            <span className="font-bold">Sterile:</span> {product.sterile}
          </div>  
        </div>
        <a className="block text-center btn-outline w-full my-4" href={`/demo/product-detail/${product.id}`}>View Details</a>
      </div>
    </div>
)
export default ProductCard;