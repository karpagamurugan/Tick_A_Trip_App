import * as React from 'react';
import { Text, Animated, TextInput, View } from 'react-native';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

export default function Profile() {
    // This hook returns `true` if the screen is focused, `false` otherwise
    const [inputstyle, setInputstyle] = useState(false)
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial 
    useEffect(() => {
       if(inputstyle){
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 10000,
            useNativeDriver: true,
        }).start();
       } 
       
    }, [inputstyle]);
    return (

        <View>
            <Animated.View // Special animatable View
                style={{
                    opacity: fadeAnim, // Bind opacity to animated value
                }}>
                <TextInput
                    style={{ width: inputstyle ? 200 : 50, backgroundColor: "red", }}
                    placeholder='hii karthick'
                    onFocus={() => setInputstyle(true)}
                    onBlur={() => setInputstyle(false)} />
            </Animated.View>
        </View>
    )


}
