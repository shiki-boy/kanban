import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function DropArea( { onDrop }: { onDrop: () => void } ) {
  const [ isVisible, setIsVisible ] = useState( false )

  const showArea = () => {
    setIsVisible( true )
  }

  const hideArea = () => {
    setIsVisible( false )
  }

  return (
    <div
      className={ cn(
        'relative h-2 transition-[padding,opacity] before:absolute before:inset-2 before:rounded-md before:border-2 before:border-dashed before:border-gray-500 before:bg-green-400 only:h-32',
        isVisible && 'py-8 opacity-100',
        !isVisible && 'opacity-0',
      ) }
      onDragEnter={ showArea }
      onDragLeave={ hideArea }
      onDrop={ () => {
        onDrop()
        hideArea()
      } }
      onDragOver={ ( ev ) => ev.preventDefault() }
    />
  )
}