'use client'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'

import './styles.modules.scss'

interface PropsType {
  children: React.ReactNode;
}

function TasksLayout( { children }: PropsType ) {
  const pathname = usePathname()
  const router = useRouter()

  const tabs = [
    {
      link: '/tasks/list',
      title: 'List',
    },
    {
      link: '/tasks/board',
      title: 'Board',
    },
  ]

  return (
    <section className='h-full'>
      <div className='tabs'>
        <nav>
          {tabs.map( ( tab ) => (
            <div
              key={ tab.title }
              className={ cn(
                'tab',
                pathname.includes( tab.link ) && 'active',
              ) }
              onClick={ () => router.push( tab.link ) }
            >
              {tab.title}
            </div>
          ) )}
        </nav>
      </div>

      <div className='h-full'>{children}</div>
    </section>
  )
}

export default TasksLayout
