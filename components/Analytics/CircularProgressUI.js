import React from 'react';
import {View, PixelRatio, StyleSheet} from 'react-native';
import { COLORS, SIZES } from '../../constants';
import CircularProgress from './CircularProgress';

const radius = PixelRatio.roundToNearestPixel(130);
const STROKE_WIDTH = 30;



const CircularProgressUI = () => {

  return (
    <View style={styles.container}>
      <View style={styles.ringChartContainer}>
        <CircularProgress
          strokeWidth={STROKE_WIDTH}
          radius={radius}
          backgroundColor={COLORS.primary}  //"#f93986"
          percentage={30}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      marginTop:SIZES.radius,
      justifyContent: 'center',
      alignItems: 'center',
    },
    ringChartContainer: {
      width: radius * 2,
      height: radius * 2,
    },
  });

  export default CircularProgressUI