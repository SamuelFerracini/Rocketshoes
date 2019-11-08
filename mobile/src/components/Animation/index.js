import React, { Component } from 'react';
import LottieView from 'lottie-react-native';
import { Animated, Easing } from 'react-native';

import { CenterAnimation } from './styles';

export default class Animation extends Component {
  state = {
    isStopped: false,
    isPaused: false,
    progress: new Animated.Value(0),
  };

  componentDidMount() {
    const { progress } = this.state;

    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
    }).start();
  }

  render() {
    const { animation, size, progress, autoplay } = this.props;
    const { isStopped, isPaused } = this.state;

    return (
      <CenterAnimation>
        <LottieView
          height={size}
          width={size}
          source={animation}
          autoPlay={autoplay}
          progress={progress}
        />
      </CenterAnimation>
    );
  }
}
