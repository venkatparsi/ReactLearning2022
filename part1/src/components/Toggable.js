import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, ref)  => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })


  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel ? props.buttonLabel : 'Show'}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <div>
        <button onClick={toggleVisibility}>{props.hideLabel ? props.hideLabel : 'Cancel'}</button>
        </div>
      </div>
    </div>
  )
})

export default Togglable