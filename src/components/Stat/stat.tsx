import React, { ChangeEvent, FocusEvent } from 'react'
import { IoIosCloseCircle } from 'react-icons/io'
import './stat.scss'

interface IStat {
    children: string,
    onClear: React.MouseEventHandler<SVGElement>,
    onUpdate: any,
    onFocus: any,
    error: () => string,
    value: number
}

const Stat = ({ children, onClear, onUpdate, onFocus, value, error }: IStat) => (
    <>
        <div className='statWrapper'>
            <span className='statContainer'>
                <label htmlFor={children} className='statLabel'>
                    {children}
                </label>
                <input
                  id={children}
                  value={value}
                  className='statInput'
                  style={error() ? { borderColor: 'red' } : {}}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onUpdate(e)}
                  onFocus={(e: FocusEvent<HTMLInputElement>) => onFocus(e)}
                  type='number'
                  min={-1000}
                  max={10000}
                  name={children}
                />
                <IoIosCloseCircle onClick={onClear} size={40} />
            </span>
        </div>
        <div>{error()}</div>
    </>
)

export default Stat