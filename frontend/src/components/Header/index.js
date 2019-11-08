import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Cart } from './styles';
import logo from '../../assets/images/logo.svg';
import Animation from '../Animation';
import basketAnimation from '../../assets/animations/basket.json';

export default function Header() {
  const cartSize = useSelector(state => state.cart.length);
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Rocketshoes" />
      </Link>

      <Cart to="/cart">
        <div style={{ marginRight: -10 }}>
          <strong>Minha cesta</strong>
          {cartSize === 0 ? <span>nenhum item</span> : null}
          {cartSize === 1 ? <span>{cartSize} item</span> : null}
          {cartSize > 1 ? <span>{cartSize} itens</span> : null}
        </div>
        <Animation animation={basketAnimation} size={100} />
      </Cart>
    </Container>
  );
}
