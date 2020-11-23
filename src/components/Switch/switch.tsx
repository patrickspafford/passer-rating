import React from 'react'
import { Switch as MaterialSwitch } from '@material-ui/core'
import './switch.scss'

interface ISwitch {
    isNFL: boolean,
    toggle: any,
    leftLogo: string,
    leftLogoAltText: string,
    rightLogo: string,
    rightLogoAltText: string,
}
const Switch = ({ isNFL, toggle, leftLogo, leftLogoAltText, rightLogo, rightLogoAltText }: ISwitch) => (
    <>
        <img style={isNFL ? {} : { opacity: 0.25 }} alt={leftLogoAltText} src={leftLogo} />
            <MaterialSwitch checked={!isNFL} onChange={toggle} />
        <img style={!isNFL ? {} : { opacity: 0.25 }} alt={rightLogoAltText} src={rightLogo} />
    </>
)

export default Switch