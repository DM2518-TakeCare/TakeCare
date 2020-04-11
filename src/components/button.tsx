import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { paperTheme } from '../theme/paper-theme';


interface ButtonProps {
    /** When the button is pressed */
    onPress: () => void,

    /** If the buttons should expand horizontal */
    expandHorizontal?: boolean,

    /** If the button can be pressed or not */
    disabled?: boolean,

    /** The color of the component */
    color?: string,

    /** If the button is toggled off */
    toggleOff?: boolean 

    /** The size of the button, only affecting the padding */
    size?: 'small' | 'big'
}

const buttonStyle = StyleSheet.create({
    button: {
        // Big value to insure that the button do not have any edge
        borderRadius: 100
    },
});

export const Button: React.FC<ButtonProps> = ({
    children, 
    onPress, 
    expandHorizontal = false, 
    disabled = false, 
    color = paperTheme.colors.primary,
    toggleOff: toggleOff = false,
    size = 'small'}) => {

    return (
        <PaperButton
            style={{
                ...buttonStyle.button,
                width: expandHorizontal ? '100%' : 'auto',
                opacity: toggleOff ? 0.5 : 1
            }}
            labelStyle={{
                padding: size === 'big' ? 10 : 0,
            }}
            uppercase={false}
            color={color}
            disabled={disabled}
            onPress={() => onPress()} 
            mode="contained">
            {children}
        </PaperButton>
    );
}
