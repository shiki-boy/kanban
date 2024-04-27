'use client'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { cn } from '@/lib/utils'
import { File, Inbox } from 'lucide-react'
import React from 'react'
import { Nav } from './components/Nav'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { Separator } from '@radix-ui/react-separator'

export default function AppLayout( { children }: { children: React.ReactNode } ) {
  const [ isCollapsed, setIsCollapsed ] = React.useState( false )

  return (
    <main className='h-screen'>
      <TooltipProvider delayDuration={ 0 }>
        <ResizablePanelGroup
          direction='horizontal'
          className='h-full items-stretch'
        >
          <ResizablePanel
            defaultSize={ 255 }
            collapsedSize={ 4 }
            collapsible={ true }
            minSize={ 15 }
            maxSize={ 55 }
            onCollapse={ () => setIsCollapsed( true ) }
            onExpand={ () => setIsCollapsed( false ) }
            className={ cn(
              'max-w-[255px]',
              isCollapsed
                && 'min-w-[50px] transition-all duration-300 ease-in-out',
            ) }
          >
            <Nav
              isCollapsed={ isCollapsed }
              links={ [
                {
                  icon: Inbox,
                  label: '128',
                  title: 'Projects',
                  variant: 'ghost',
                },
                {
                  icon: Inbox,
                  label: '128',
                  title: 'Tasks',
                  variant: 'default',
                },
                {
                  icon: File,
                  label: '9',
                  title: 'Notifications',
                  variant: 'ghost',
                },
              ] }
            />
            <Separator />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={ 455 } minSize={ 30 }>
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </TooltipProvider>
    </main>
  )
}
