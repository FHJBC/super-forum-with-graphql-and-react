import React, { useState } from 'react'
import { useWindowDimensions } from '../hooks/useWindowDimensions'

const LeftMenu = () => {
  const { width } = useWindowDimensions()
  const [categories, setCategories] = useState<JSX.Element>(
    <div>Left Menu</div>
  )

  if (width <= 768) {
    return null
  }
  return (
    <div className="leftmenu">{categories}</div>
  )
}

export default LeftMenu