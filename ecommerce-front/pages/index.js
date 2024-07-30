import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function HomePage({product}){
  return(
    <div>
      <Header/>
      <Featured product={product}/>
    </div>
  );
}

export async function getServerSideProps(){
  const featuredProductId = '669879b013271ec875d0f75d';
  await mongooseConnect();
  const product = await Product.findById(featuredProductId);
  return{
    props: {product: JSON.parse(JSON.stringify(product))},
  };
}