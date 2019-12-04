import React, { useState, useEffect } from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
  MdKeyboardBackspace,
} from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as CartActions from '../../store/modules/cart/actions';
import { Container, ProductTable, Total } from './styles';
import { formatPrice } from '../../util/format';
import sadAnimation from '../../assets/animations/sad.json';
import checkAnimation from '../../assets/animations/check.json';
import Animation from '../../components/Animation';

export default function Cart() {
  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce((sumTotal, prod) => {
        return sumTotal + prod.amount * prod.price;
      }, 0)
    )
  );

  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
    }))
  );

  const dispatch = useDispatch();

  const [finished, setFinished] = useState(false);
  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }
  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  function finishShopping() {
    setFinished(true);
    console.tron.log(finished);
  }

  return (
    <Container>
      {finished ? (
        <>
          <h2 style={{ textAlign: 'center', marginBottom: 30 }}>
            A ROCKETSHOES agradece sua escolha
          </h2>
          <Animation animation={checkAnimation} size={200} autoplay />
        </>
      ) : (
        <>
          {cart.length > 0 ? (
            <>
              <ProductTable>
                <thead>
                  <tr>
                    <th />
                    <th>PRODUTO</th>
                    <th>SUBTOTAL</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {cart.map(product => (
                    <tr key={product.id}>
                      <td>
                        <img src={product.image} alt={product.title} />
                      </td>
                      <td>
                        <strong>{product.title}</strong>
                        <span>{product.priceFormatted}</span>
                      </td>
                      <td>
                        <div>
                          <button
                            type="button"
                            onClick={() => decrement(product)}
                          >
                            <MdRemoveCircleOutline size={20} color="#7159c1" />
                          </button>
                          <input
                            type="number"
                            readOnly
                            value={product.amount}
                          />
                          <button
                            type="button"
                            onClick={() => increment(product)}
                          >
                            <MdAddCircleOutline size={20} color="#7159c1" />
                          </button>
                        </div>
                      </td>
                      <td>
                        <strong>{product.subtotal}</strong>
                      </td>
                      <td>
                        <button type="button">
                          <MdDelete
                            size={20}
                            color="#7159c1"
                            onClick={() =>
                              dispatch(CartActions.removeFromCart(product.id))
                            }
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </ProductTable>
              <footer>
                <button type="button" onClick={finishShopping}>
                  Finalizar Pedido
                </button>
                <Total>
                  <span>TOTAL</span>
                  <strong>{total}</strong>
                </Total>
              </footer>
            </>
          ) : (
            <>
              <h2 style={{ textAlign: 'center' }}>
                A sua cesta de compras está vazia
              </h2>
              <Animation animation={sadAnimation} size={200} autoplay loop />
              <Link to="/">
                <MdKeyboardBackspace size={50} color="#7159c1" />
              </Link>
            </>
          )}
        </>
      )}
    </Container>
  );
}
