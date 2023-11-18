import React from 'react'

export default function Avatar({children,
    borderRadius,
    backgroundColor,
    px,py,color, 
    textDecoration,
    textAlign,
    width,
    marginRight,
}) 
{

 const style = {
    borderRadius,
    backgroundColor,
    padding:`${py} ${px}`,
    color:color || 'black',
    textDecoration,
    textAlign,
    width,
    marginRight
 }

  return (
    <div style={style}>
     {children}
    </div>
  )
}
