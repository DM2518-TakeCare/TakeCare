import React, { FC } from 'react'
import { View, Text} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import SvgIcon from './svg-icons'

type StatusHeaderTypes = 'sent'|'accepted'|'completed'|'give-help'|'receive-help'

interface StatusHeaderProps {
    type: StatusHeaderTypes
    color: string
    hideStatusText?: boolean
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

const StatusHeader: FC<StatusHeaderProps> = (props) => {
    const renderIcons = () => {
        if(props.type === 'give-help' || props.type === 'receive-help'){
            return  <SvgIcon name={props.type} color={props.color} height='120' width='120'/>
        }     
        else {
            return <MaterialCommunityIcons
                name={statusHeaderInfo[props.type].icon} 
                size={120} color={props.color}/>
        }
    }
    return (
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {renderIcons()}
            {props.hideStatusText ? <></> : <Text style={{textAlign: 'center'}}>{statusHeaderInfo[props.type].statusText}</Text>}
        </View>
    )
}

export default StatusHeader