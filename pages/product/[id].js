import Button from "@/components/Button";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import Center from "@/components/center";
import Header from "@/components/header";
import Carticons from "@/components/icons/cartIcon";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
import { CartContext } from "@/components/cartContext";
import { useContext } from "react";

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Price = styled.span`
  font-size: 1.5rem;
`;

export default function ProductPage({ product }) {
  const { addCartProduct } = useContext(CartContext);
  return (
    <>
      <Header />
      <Center>
        <ColsWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            {" "}
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <div>
                <Price>${product.price}</Price>{" "}
              </div>
              <div>
                <Button primary onClick={() => addCartProduct(product._id)}>
                  <Carticons />
                  Add to Cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColsWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
