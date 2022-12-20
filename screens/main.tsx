import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, SafeAreaView, useWindowDimensions } from 'react-native'
import { Canvas, Circle, Group, mix, Oval, SweepGradient, useComputedValue, useLoop, vec } from '@shopify/react-native-skia';

const RADIUS = 25;

export default function Main() {

    const [isAnimated, setAnimated] = useState(false)

    const { height, width } = useWindowDimensions();
    const center = vec(width / 2, height / 2);
    const OVAL_X = width / 2 - 60;
    const OVAL_Y = height / 2 - 150;
    const progress = useLoop({ duration: 10000 });
    const transform = useComputedValue(
        () => [{ rotate: mix(progress.current, 0, Math.PI * 2) }],
        [progress],
    );
    const Gradient = () => (
        <SweepGradient
            c={vec(128, 128)}
            colors={["#4CAF50"]}
        />
    );

    const animated = () => {
        setAnimated(true)
        setTimeout(() => {
            setAnimated(false)
        }, 3000)
    }

    return (
        <>
            {
                isAnimated ?
                    <Canvas style={styles.container}>
                        <Group blendMode="lighten" origin={center} transform={transform}>
                            <Circle r={RADIUS} color="lightblue" c={center}>
                                <SweepGradient
                                    c={vec(128, 128)}
                                    colors={["#4CAF50"]}
                                />
                            </Circle>
                            <Group style="stroke" color="lightblue" strokeWidth={18}>
                                <Oval x={OVAL_X} y={OVAL_Y} height={300} width={120}>
                                    <Gradient />
                                </Oval>
                                <Group
                                    origin={center}
                                    transform={[
                                        {
                                            rotate: Math.PI / 3,
                                        },
                                    ]}>
                                    <Oval x={OVAL_X} y={OVAL_Y} height={300} width={120}>
                                        <Gradient />
                                    </Oval>
                                </Group>
                                <Group
                                    origin={center}
                                    transform={[
                                        {
                                            rotate: -Math.PI / 3,
                                        },
                                    ]}>
                                    <Oval x={OVAL_X} y={OVAL_Y} height={300} width={120}>
                                        <Gradient />
                                    </Oval>
                                </Group>
                            </Group>
                        </Group>
                    </Canvas> :
                    <SafeAreaView style={styles.container}>
                        <TouchableOpacity style={styles.buttonContainer} onPress={animated}>
                            <Text style={styles.btnText}>Click Here !!!</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
            }

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        backgroundColor: "#4CAF50",
        padding: 15,
        textAlign: 'center'
    },
    btnText: {
        color: '#fff'
    }
})