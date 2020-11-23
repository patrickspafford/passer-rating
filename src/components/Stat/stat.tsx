import React, { ChangeEvent } from 'react'
import { IoIosCloseCircle } from 'react-icons/io'
import './stat.scss'

interface IStat {
    children: string,
    onClear: React.MouseEventHandler<SVGElement>,
    onUpdate: any,
    error: () => string,
    value: number
}

const Stat = ({ children, onClear, onUpdate, value, error }: IStat) => (
    <>
        <div className='statWrapper'>
            <span className='statContainer'>
                <label className='statLabel'>{children}</label>
                <input value={value} className='statInput' onChange={(e: ChangeEvent<HTMLInputElement>) => onUpdate(e)} type='number' min={-1000} max={10000} name={children} />
                <IoIosCloseCircle onClick={onClear} size={40} />
            </span>
        </div>
        <div>{error()}</div>
    </>
)

export default Stat