import React, { FC } from 'react'
import { View, Text} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import SvgIcon from './svg-icon'
import { paperTheme } from '../theme/paper-theme'

type StatusHeaderTypes = 'sent' | 'accepted' | 'completed' | 'give-help' | 'receive-help'

interface StatusHeaderProps {
    type: StatusHeaderTypes
    color?: string
    hideStatusText?: boolean,
    iconSize?: number,
}

interface StatusHeaderParameters{
    icon: string
    statusText: string
}

const statusHeaderInfo: {[key in StatusHeaderTypes]: StatusHeaderParameters} = {
    'sent': {icon: 'clock-outline', statusText: 'Your task has been sent.\nWaiting for someone to accept it.'},
    'accepted':  {icon: 'cart-outline', statusText: 'Your task has been accepted.'},
    'completed':  {icon: 'check-circle-outline', statusText: 'Your task has been completed!'},
    'give-help':  {icon: '', statusText: ''}, 
    'receive-help':  {icon: '', statusText: ''}
}

const StatusHeader: FC<StatusHeaderProps> = ({type, color=paperTheme.colors.primary, hideStatusText=false, iconSize=120}) => {
    const renderIcons = () => {
        if(type === 'give-help' || type === 'receive-help'){
            return <SvgIcon name={type} color={color} height={iconSize} width={iconSize}/>
        }     
        else {
            return <MaterialCommunityIcons
                name={statusHeaderInfo[type].icon} 
                size={iconSize} color={color}/>
        }
    }
    return (
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {renderIcons()}
            {hideStatusText ? <></> : <Text style={{textAlign: 'center'}}>{statusHeaderInfo[type].statusText}</Text>}
        </View>
    )
}

export default StatusHeader