import NewProduct from "../components/NewProducts";
import Featured from "../components/featured";
import Header from "../components/header";
import { mongooseConnect } from "../lib/mongoose";
import { Product } from "../models/Product";

export default function HomePage({ featuredProduct, newProducts }) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProduct products={newProducts} />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "647f04e82ab83865f671d893";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
