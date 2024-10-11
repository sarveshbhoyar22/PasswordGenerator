import React from 'react'

export default function Checkbox(props) {

    return (
        <div className='flex item-center gap-x-2'>
            <input 
            className='accent-orange-500 cursor-pointer'
            type="checkbox"
            defaultChecked={props.defaultChecked}
            onChange={props.onChange}
            id={props.id}

             />
             <label htmlFor={props.id} className="text-white hover:text-blue-500 cursor-pointer">{props.name}</label>
        </div>
    )
}