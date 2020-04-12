import React, { FC } from 'react'
import { View, Text } from 'react-native'
import { paperTheme } from '../../theme/paper-theme'
import { Ionicons } from '@expo/vector-icons'

type UserInfoTypes = 'name' | 'address' | 'phone';

interface UserInfoProps {
    user: any, //TODO, create user interface
    type: UserInfoTypes
}

const userIcons: {[key in UserInfoTypes]: string} = {
    'name': 'md-person',
    'address': 'md-pin',
    'phone': 'md-call',
}

const UserInfo: FC<UserInfoProps> = (props) => {
    return (
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name={userIcons[props.type]} size={25} color={paperTheme.colors.accent} />
            <Text style={{marginLeft: 5}}>
                {props.user[props.type]}
            </Text>
        </View>
    )
}

export default UserInfo
