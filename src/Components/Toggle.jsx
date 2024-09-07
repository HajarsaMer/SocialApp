import React, { useContext, useEffect } from 'react'
import { darkmode } from '../Context/darkContext'


export default function Toggle() {
    
  let {toggleDark} = useContext(darkmode)
    return (
      <div className='mx-5'>
        <input type="checkbox" class="checkbox" id="checkbox" onChange={toggleDark}/>
        <label for="checkbox" class="checkbox-label">
          <i class="fas fa-moon"></i>
          <i class="fas fa-sun"></i>
          <span class="ball"></span>
        </label>
      </div>
    )
}
