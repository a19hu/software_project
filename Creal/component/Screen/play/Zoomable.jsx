import React, { useRef, useState } from 'react';
import { View, Image, PanResponder, Animated } from 'react-native';

const Zoomable = ({ children }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const [lastScale, setLastScale] = useState(1);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        pan.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Reset the pan value after releasing the gesture
        pan.flattenOffset();
      },
      onPanResponderGrant: () => {
        // Flatten the offset when starting the gesture
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onShouldBlockNativeResponder: () => {
        return false;
      }
    })
  ).current;

  const onPinchZoom = (event) => {
    const { scale, focalX, focalY } = event.nativeEvent;
    setLastScale(scale);
  };

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={[
          {
            transform: [{ translateX: pan.x }, { translateY: pan.y }]
          }
        ]}
        {...panResponder.panHandlers}
      >
        <Animated.View
          style={{
            transform: [
              { scale: scale.interpolate({ inputRange: [1, 4], outputRange: [1, 4], extrapolate: 'clamp' }) }
            ]
          }}
          collapsable={false}
        >
          {React.Children.map(children, child => React.cloneElement(child, { onPinchZoom }))}
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default Zoomable;
