import React from 'react'

import { CardsCollectionType } from '@/lib/types'

function Ticket( {
  column,
  id,
  onDragStart,
}: {
  column: keyof CardsCollectionType,
  id: number,
  onDragStart: ( { col, id }: any ) => void; // eslint-disable-line
} ) {
  return (
    <>
      <div
        draggable='true'
        onDragStart={ () =>
          onDragStart( {
            col: column,
            id,
          } )
        }
        className='card cursor-grab active:cursor-grabbing active:animate-pulse h-[100px] bg-green-100 rounded-md p-2 grid place-items-center'
        key={ `-${ id }` }
      >
        {id}
      </div>

    </>
  )
}

export default Ticket
