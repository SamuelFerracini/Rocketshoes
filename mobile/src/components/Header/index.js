import React from 'react';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, Text } from 'react-native';
import { Wrapper, Container, Logo, BasketContainer, ItemCount } from './styles';
import Animation from '../Animation/index';
import basketAnimation from '../../animations/basket.json';

function Header({ navigation, cartSize }) {
  return (
    <Wrapper>
      <Container>
        <Logo />

        <BasketContainer onPress={() => console.tron.log('click')}>
          <Icon name="shopping-basket" color="#FFF" size={24} />
          <ItemCount>{cartSize || 0}</ItemCount>
        </BasketContainer>
      </Container>
    </Wrapper>
  );
}

export default connect(
  state => ({
    cartSize: state.cart.length,
  }),
  null
)(Header);

// export default Header;
