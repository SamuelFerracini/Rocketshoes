import React, { Component } from 'react';
import Lottie from 'react-lottie';

export default class Animation extends Component {
  state = { isStopped: false, isPaused: false };

  render() {
    const { animation, size, loop, autoplay } = this.props;
    const { isStopped, isPaused } = this.state;

    const defaultOptions = {
      loop,
      autoplay,
      animationData: animation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    };

    return (
      <Lottie
        options={defaultOptions}
        height={size}
        width={size}
        isStopped={isStopped}
        isClickToPauseDisabled
        isPaused={isPaused}
      />
    );
  }
}
