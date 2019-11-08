import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, Text } from 'react-native';
import * as CartActions from '../../store/modules/cart/actions';
import sadAnimation from '../../animations/sad.json';
import checkAnimation from '../../animations/check.json';
import Animation from '../../components/Animation';
import { formatPrice } from '../../util/format';
import colors from '../../styles/colors';

import {
  Container,
  Products,
  Product,
  ProductInfo,
  ProductImage,
  ProductDetails,
  ProductTitle,
  ProductPrice,
  ProductDelete,
  ProductControls,
  ProductControlButton,
  ProductAmount,
  ProductSubtotal,
  TotalContainer,
  TotalText,
  TotalAmount,
  Order,
  OrderText,
  Teste,
  EmptyContainer,
  EmptyText,
} from './styles';

function Cart({
  navigation,
  products,
  total,
  removeFromCart,
  updateAmountRequest,
}) {
  const [finished, setFinished] = useState(false);

  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }

  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  function handleFinish() {
    setFinished(true);
  }

  return (
    <Container>
      {finished ? (
        <EmptyContainer>
          <EmptyText>Obrigado por comprar</EmptyText>
          <Text style={{ marginTop: 50 }}> </Text>
          <Animation animation={checkAnimation} size={300} autoplay />
        </EmptyContainer>
      ) : (
        <>
          {products.length ? (
            <>
              <Products>
                {products.map(product => (
                  <Product key={product.id}>
                    <ProductInfo>
                      <ProductImage source={{ uri: product.image }} />
                      <ProductDetails>
                        <ProductTitle>{product.title}</ProductTitle>
                        <ProductPrice>{product.priceFormatted}</ProductPrice>
                      </ProductDetails>
                      <ProductDelete onPress={() => removeFromCart(product.id)}>
                        <Icon
                          name="delete-forever"
                          size={24}
                          color={colors.primary}
                        />
                      </ProductDelete>
                    </ProductInfo>
                    <ProductControls>
                      <ProductControlButton onPress={() => decrement(product)}>
                        <Icon
                          name="remove-circle-outline"
                          size={20}
                          color={colors.primary}
                        />
                      </ProductControlButton>
                      <ProductAmount value={String(product.amount)} />
                      <ProductControlButton onPress={() => increment(product)}>
                        <Icon
                          name="add-circle-outline"
                          size={20}
                          color={colors.primary}
                        />
                      </ProductControlButton>
                      <ProductSubtotal>{product.subtotal}</ProductSubtotal>
                    </ProductControls>
                  </Product>
                ))}
              </Products>
              <TotalContainer>
                <TotalText>TOTAL</TotalText>
                <TotalAmount>{total}</TotalAmount>
                <Order onPress={() => handleFinish()}>
                  <OrderText>FINALIZAR PEDIDO</OrderText>
                </Order>
              </TotalContainer>
            </>
          ) : (
            <EmptyContainer>
              <EmptyText>A sua cesta está vazia.</EmptyText>
              <Animation animation={sadAnimation} size={300} autoplay loop />
              <Teste>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Main')}
                  style={{ marginTop: -30 }}
                >
                  <Icon
                    name="arrow-back"
                    size={25}
                    color="#999"
                    style={{ color: '#7159c1' }}
                  />
                </TouchableOpacity>
              </Teste>
            </EmptyContainer>
          )}
        </>
      )}
    </Container>
  );
}

const mapStateToProps = state => ({
  products: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
    priceFormatted: formatPrice(product.price),
  })),
  total: formatPrice(
    state.cart.reduce(
      (total, product) => total + product.price * product.amount,
      0
    )
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
