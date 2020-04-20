import React, { FC } from 'react'
import Svg, { Path } from "react-native-svg"

type SvgTypes = 'receive-help'|'give-help'

interface SvgIconProps {
    name: SvgTypes
    color: string
    height: string
    width: string
}

interface SvgParameters {
    viewBox: string
    d: Array<string>
}

const svgTypesInfo: {[key in SvgTypes]: SvgParameters} = {
    'give-help':  {viewBox: '0 -24 511.999 511', d: ['M50 262.598c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 0', 'M459.617 297.273l-94.273 32.41c.418-2.32.652-4.687.652-7.09 0-22.054-17.941-40-40-40h-64.758c-1.718 0-3.414-.44-4.91-1.284l-52.832-29.715a70.059 70.059 0 00-34.328-9h-70.89C94.151 230.957 83.034 222.598 70 222.598H10c-5.523 0-10 4.476-10 10v179.996c0 5.523 4.477 10 10 10h60c12.738 0 23.66-8.004 27.996-19.246 11.32 1.406 24.418 4.754 32.649 9.691l52.296 31.379a127.509 127.509 0 0065.606 18.176c18.312 0 36.055-3.844 52.738-11.422l186.645-82.184c20.672-8.386 30.879-33.187 19.062-55.047-8.691-16.086-29.047-23.242-47.375-16.668zM80 392.641c-.023 5.492-4.504 9.953-10 9.953H20V242.598h50c5.512 0 10 4.484 10 10zm400.332-42.149c-.105.04-.21.086-.316.13l-186.957 82.32c-14.082 6.406-29.059 9.652-44.512 9.652-19.485 0-38.61-5.297-55.313-15.324l-52.3-31.38c-11.196-6.714-27.227-10.808-40.934-12.449V262.598h69.168a50.029 50.029 0 0124.52 6.425l52.832 29.715a30.045 30.045 0 0014.718 3.86h64.758c11.027 0 20 8.968 20 20 0 10.988-8.976 20-20 20H224.34c-5.524 0-10 4.476-10 10 0 5.52 4.476 9.996 10 9.996h101.656a39.922 39.922 0 0018.746-4.684l121.59-41.797c8.961-3.234 19.094-.015 23.066 7.336 5.957 11.02 1.032 23-9.066 27.043zm0 0M291.246 243.055c1.883 1.629 4.215 2.441 6.55 2.441s4.673-.812 6.552-2.441c81.59-70.711 132.058-106.496 132.058-162.106C436.406 36.957 405.262.5 361.508.5c-28.735 0-50.738 16.563-64.91 41.418C282.457 17.118 260.477.5 231.699.5c-33.496 0-61.5 21.707-71.344 55.297-1.554 5.3 1.485 10.855 6.786 12.41 5.3 1.555 10.855-1.484 12.406-6.785C186.832 36.562 207.3 20.5 231.699 20.5c28.528 0 48.54 25.332 55.262 48.918a9.999 9.999 0 0019.273 0c.137-.488 14.028-48.918 55.274-48.918 31.297 0 54.898 25.984 54.898 60.45 0 44.484-43.484 76.554-118.617 141.335-45.777-39.312-82.14-66.984-102.809-94.055-3.351-4.39-9.625-5.234-14.015-1.882-4.39 3.351-5.23 9.625-1.883 14.02 23.297 30.51 62.625 59.745 112.164 102.687zm0 0', 'M169 88.598c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 0']},
    'receive-help': {viewBox: '0 0 511 511', d: ['M471.5 160H351V39.5C351 17.72 333.28 0 311.5 0h-112C177.72 0 160 17.72 160 39.5V160H39.5C17.72 160 0 177.72 0 199.5v112C0 333.28 17.72 351 39.5 351H160v120.5c0 21.78 17.72 39.5 39.5 39.5h112c21.78 0 39.5-17.72 39.5-39.5V351h120.5c21.78 0 39.5-17.72 39.5-39.5v-112c0-21.78-17.72-39.5-39.5-39.5zM496 311.5c0 13.509-10.991 24.5-24.5 24.5h-128a7.5 7.5 0 00-7.5 7.5v128c0 13.509-10.991 24.5-24.5 24.5h-112c-13.509 0-24.5-10.991-24.5-24.5v-128a7.5 7.5 0 00-7.5-7.5h-128C25.991 336 15 325.009 15 311.5v-112c0-13.509 10.991-24.5 24.5-24.5h128a7.5 7.5 0 007.5-7.5v-128c0-13.509 10.991-24.5 24.5-24.5h112c13.509 0 24.5 10.991 24.5 24.5v128a7.5 7.5 0 007.5 7.5h128c13.509 0 24.5 10.991 24.5 24.5v112z', 'M295.498 47H304v120.5c0 21.78 17.72 39.5 39.5 39.5h32.001a7.5 7.5 0 000-15H343.5c-13.509 0-24.5-10.991-24.5-24.5v-128a7.5 7.5 0 00-7.5-7.5h-16.002a7.5 7.5 0 000 15zM407.502 207h15.997a7.5 7.5 0 000-15h-15.997a7.5 7.5 0 000 15zM143.499 207H167.5c21.78 0 39.5-17.72 39.5-39.5V47h56.499a7.5 7.5 0 000-15H199.5a7.5 7.5 0 00-7.5 7.5v128c0 13.509-10.991 24.5-24.5 24.5h-24.001a7.5 7.5 0 000 15z', 'M471.5 192h-16a7.5 7.5 0 000 15h8.5v97H343.5c-21.78 0-39.5 17.72-39.5 39.5V464h-97V343.5c0-21.78-17.72-39.5-39.5-39.5H47v-97h64.5a7.5 7.5 0 000-15h-72a7.5 7.5 0 00-7.5 7.5v112a7.5 7.5 0 007.5 7.5h128c13.509 0 24.5 10.991 24.5 24.5v128a7.5 7.5 0 007.5 7.5h112a7.5 7.5 0 007.5-7.5v-128c0-13.509 10.991-24.5 24.5-24.5h128a7.5 7.5 0 007.5-7.5v-112a7.5 7.5 0 00-7.5-7.5z']}
}
const SvgIcon: FC<SvgIconProps> = (props) => {
  return (
    <Svg height={props.height} width={props.width} viewBox={svgTypesInfo[props.name].viewBox} {...props}>
        {svgTypesInfo[props.name].d.map((path, index) => {
            return <Path key={index} fill={props.color} d={path}/>
        })}
    </Svg>
  )
}
export default SvgIcon

