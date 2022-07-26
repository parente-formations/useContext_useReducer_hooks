import styled from 'styled-components';
import { useShop } from './context/ShopContext';
import ProductCard from './ProductCard';
import { ProductsWrapper } from './Products';

const Cart = () => {
  const { total, products } = useShop();
  return (
    <>
      <Title>{`Your cart total is ${total}$`}</Title>
      <ProductsWrapper>
        {products.map((product) => (
          <ProductCard {...product} key={product.name} />
        ))}
      </ProductsWrapper>
    </>
  );
};

export default Cart;

const Title = styled.p`
  font-weight: bold;
  font-size: 20px;
  margin-top: 20px;
`;
