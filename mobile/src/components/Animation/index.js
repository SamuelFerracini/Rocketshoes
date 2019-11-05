import React, { Component } from 'react';
import LottieView from 'lottie-react-native';

import { CenterAnimation } from './styles';

export default class Animation extends Component {
  state = { isStopped: false, isPaused: false };

  render() {
    const { animation, size, loop, autoplay } = this.props;
    const { isStopped, isPaused } = this.state;

    return (
      <CenterAnimation>
        <LottieView
          height={size}
          width={size}
          isStopped={isStopped}
          loop={loop}
          source={animation}
          autoPlay={autoplay}
          isClickToPauseDisabled
          isPaused={isPaused}
        />
      </CenterAnimation>
    );
  }
}
