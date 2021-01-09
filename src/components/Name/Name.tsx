import React from 'react'
import './Name.scss'

interface IName {
    value: string,
    placeholder: string,
    updateName: any
}

const Name = ({ value, updateName, placeholder }: IName) => (
    <input
      id='name'
      className='nameInput'
      placeholder={placeholder}
      type="text"
      value={value}
      aria-label='Passer Name'
      onChange={(e) => updateName(e)}
    />
)

export default Name