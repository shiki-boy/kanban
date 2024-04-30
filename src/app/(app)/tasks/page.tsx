/* eslint-disable sort-keys */
'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'

const data = {
  todo: [ 6, 7 ],
  'in-progress': [ 1, 2, 3 ],
  done: [ 4, 5 ],
}

export default function Tasks() {
  const onDrop = ( col: any, i: number ) => {}

  return (
    <>
      <div className='flex h-full gap-2'>
        {Object.keys( data ).map( ( column, ci ) => (
          <div className='w-[200px] h-full bg-green-200 p-4' key={ ci }>
            <p className='mb-4 font-bold w-full'>{column}</p>

            <div className='flex flex-col gap-2'>
              {data[column as keyof typeof data].map( ( card ) => (
                <>
                  <DropArea onDrop={ () => onDrop( column, ci ) } />
                  <div
                    draggable='true'
                    onDragStart={ () => {} }
                    className='card cursor-grab active:cursor-grabbing active:animate-pulse h-[100px] bg-green-100 rounded-md p-2 grid place-items-center'
                    key={ `-${ card }` }
                  >
                    {card}
                  </div>
                </>
              ) )}
            </div>
          </div>
        ) )}
      </div>
    </>
  )
}

function DropArea( { onDrop }: { onDrop: () => void } ) {
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
