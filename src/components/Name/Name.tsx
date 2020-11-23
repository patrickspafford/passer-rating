import React from 'react'
import './Name.scss'

interface IName {
    value: string,
    updateName: any
}

const Name = ({ value, updateName }: IName) => (
    <input
      className='nameInput'
      placeholder='Joe Montana'
      type="text"
      value={value}
      onChange={(e) => updateName(e)}
    />
)

export default Name