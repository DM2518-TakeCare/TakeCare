import React, { Props } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, RoutePropsHelper } from '../router';
import { Center } from '../components/center';
import DividedView from '../components/divided-view/divided-view';
import { Button } from 'react-native-paper';
import { paperTheme } from '../theme/paper-theme'

export default function PlaygroundPage({navigation, route}:RoutePropsHelper<'Playground'>) {
    const button = <Button mode='contained' onPress={() => {}}>Hello</Button>
    return (
        <>
            <DividedView 
                upper={button} 
                lower={
                    <Text style={{color: paperTheme.colors.onPrimary}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus ex non scelerisque fermentum. Sed fringilla ac nunc eu molestie. Morbi lobortis congue magna, vitae consectetur velit fringilla semper. Suspendisse varius nulla a ornare cursus. Fusce sapien purus, pellentesque ut gravida nec, condimentum sed nibh. Etiam a ante ipsum. Nam id augue tristique, vehicula diam id, aliquet augue. In sagittis iaculis tortor in auctor. Nullam vel quam metus. Duis luctus in diam ut dapibus. Duis suscipit vestibulum mauris. Nam imperdiet justo non magna mollis mollis. Aliquam gravida massa pellentesque nulla vulputate, sed euismod mi tempus.
                    </Text>
                }
            />
        </>
    );
}