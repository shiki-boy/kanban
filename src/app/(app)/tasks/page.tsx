/* eslint-disable sort-keys */
'use client'

import { Fragment, useState } from 'react'
import DropArea from './components/DropArea'
import Ticket from './components/Ticket'
import { CardsCollectionType } from '@/lib/types'

const DATA: CardsCollectionType = {
  todo: [ 6, 7 ],
  'in-progress': [ 1, 2, 3 ],
  done: [ 4, 5 ],
}

export default function Tasks() {
  const [ data, setData ] = useState( DATA )
  const [ draggedCard, setDraggedCard ] = useState<null | {
    col: keyof typeof DATA;
    id: number;
  }>( null )

  const onDrop = ( colTarget: keyof CardsCollectionType, iTarget: number ) => {
    if ( !draggedCard ) return

    const _data = { ...data }

    // remove
    _data[draggedCard.col] = _data[draggedCard.col].filter(
      ( e ) => e !== draggedCard.id,
    )

    // add
    _data[colTarget].splice( iTarget, 0, draggedCard.id )

    setData( _data )
  }

  return (
    <>
      <div className='flex h-full gap-2'>
        {( Object.keys( data ) as unknown as Array<keyof typeof data> ).map(
          ( column, ci ) => (
            <div className='w-[200px] h-full bg-green-200 p-4' key={ ci }>
              <p className='mb-4 font-bold w-full capitalize'>
                {column.split( '-' ).join( ' ' )}
              </p>

              <DropArea onDrop={ () => onDrop( column, 0 ) } />

              <div className='flex flex-col gap-2'>
                {data[column].map( ( card, i ) => (
                  <Fragment key={ `c${ i }` }>
                    <Ticket
                      onDragStart={ setDraggedCard }
                      id={ card }
                      column={ column }
                    />
                    <DropArea onDrop={ () => onDrop( column, i + 1 ) } />
                  </Fragment>
                ) )}
              </div>
            </div>
          ),
        )}
      </div>
    </>
  )
}
