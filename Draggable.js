import React, { useRef } from 'react';
import { Animated, PanResponder, StyleSheet, View, Text } from 'react-native';

const Draggable = (prop) => {
  //const pan = useRef(new Animated.ValueXY()).current;
  const animatedValue = useRef(new Animated.ValueXY()).current;
  let value = {x: 0, y: 0}

  animatedValue.addListener((nvalue) => value = nvalue);
  const panResponder = PanResponder.create({
    //onStartShouldSetPanResponder: () => true,
    //onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: (e, gestureState) => {
      animatedValue.setOffset({x:value.x, y: value.y});
		  animatedValue.setValue({x: 0, y: 0});
    },
    onPanResponderMove: Animated.event([
      null, { dx: animatedValue.x, dy: animatedValue.y}
      ]),
    onPanResponderRelease: () => {

   animatedValue.flattenOffset();

     // Animated.spring(
     //   pan, // Auto-multiplexed
     //   { toValue: { x: pan.x, y: pan.y } } // Back to zero
     // ).start();
    },
  });

  return (
    <View style={styles.container}>

      <Animated.Image
       {...panResponder.panHandlers}
       style={[animatedValue.getLayout(), styles.size]}
       //source={{uri:'https://pngimg.com/uploads/cookie/cookie_PNG13678.png'}}
       source={{uri: prop.sprite }}
       resizeMode='contain' />
 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  size: {
   height: 100,
    width: 100,
  },
});

export default Draggable;
