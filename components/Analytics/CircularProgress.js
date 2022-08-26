import React, {FC,useEffect,useState} from 'react'
import {View, Text,StyleSheet} from 'react-native'
import Svg, {Circle} from 'react-native-svg'
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';


const CircularProgress =(
        {strokeWidth,
         radius,
         backgroundColor,
         percentage
        }
    ) => {
        
        const innerRadius = radius - strokeWidth / 2;
        const circumfrence = 2 * Math.PI * innerRadius;
        const [invertedCompletion,SetInvertedCompletion] = useState(
          (100 - percentage) / 100.0);

        const AnimatedCircle = Animated.createAnimatedComponent(Circle);

        const theta = useSharedValue(2 * Math.PI);
        const animateTo = useDerivedValue(() => 
        2 * Math.PI * invertedCompletion);

        const animatedProps = useAnimatedProps(() => {
          return {
            strokeDashoffset: withTiming(theta.value * innerRadius, {
              duration: 1500,
            }),
          };
        });

        const FADE_DELAY = 1500;
        const textOpacity = useSharedValue(0);

        const powerTextStyle = useAnimatedStyle(() => {
          return {
            opacity: withTiming(textOpacity.value, {
              duration: FADE_DELAY,
            }),
          };
        });

        const powerPercentTextStyle = useAnimatedStyle(() => {
          return {
            opacity: withTiming(textOpacity.value, {
              duration: FADE_DELAY,
            }),
          };
        });


        useEffect(() => {
          SetInvertedCompletion((100 - percentage) / 100.0)
          if (percentage == 0){
            textOpacity.value = 0;
          }
          else {
            textOpacity.value = 1;

          }

          // animateTo.value =
          // 2 * Math.PI * invertedCompletion

          theta.value = animateTo.value;
          console.log("theta " + theta.value)

          // if (!textOpacity.value) {
          //   theta.value = animateTo.value;
          //   textOpacity.value = 1;
          // } else {
          //   theta.value = 2 * Math.PI * 1.001;
          //   textOpacity.value = 0;
          // }
        
        }, [percentage])

        return (
            <View style={styles.container}>
              <Svg style={StyleSheet.absoluteFill}>
                <AnimatedCircle 
                  animatedProps={animatedProps}
                  cx={radius} 
                  cy={radius}  
                  r={innerRadius}
                  fill={'transparent'}
                  stroke={backgroundColor}
                  strokeDasharray={`${circumfrence} ${circumfrence}`}
                  strokeWidth={strokeWidth}
                  strokeDashoffset={2 * Math.PI * (innerRadius * invertedCompletion)}
                  strokeLinecap="round"
                />
              </Svg>
              <Animated.Text style={[styles.powerText, powerTextStyle]}>
                Power %
              </Animated.Text>
              <Animated.Text style={[styles.powerPercentage, powerPercentTextStyle]}>
                {percentage}
              </Animated.Text>
            </View>
        )
    }

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
    }
  })

  export default CircularProgress