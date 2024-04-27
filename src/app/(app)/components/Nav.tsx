'use client'

import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { buttonVariants } from '@/components/ui/button'

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    isActive: boolean;
    path: string;
    // variant: 'default' | 'ghost'
  }[];
}

export function Nav( { links, isCollapsed }: NavProps ) {
  return (
    <div
      data-collapsed={ isCollapsed }
      className='group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2'
    >
      <nav className='grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
        {links.map( ( link, index ) =>
          isCollapsed ? (
            <Tooltip key={ index } delayDuration={ 0 }>
              <TooltipTrigger asChild>
                <Link
                  href={ link.path }
                  className={ cn(
                    buttonVariants( {
                      size: 'icon',
                      variant: link.isActive ? 'default' : 'ghost',
                    } ),
                    'h-9 w-9',
                    link.isActive
                      && 'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
                  ) }
                >
                  <link.icon className='h-4 w-4' />
                  <span className='sr-only'>{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side='right' className='flex items-center gap-4'>
                {link.title}
                {link.label && (
                  <span className='ml-auto text-muted-foreground'>
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={ index }
              href={ link.path }
              className={ cn(
                buttonVariants( {
                  size: 'sm',
                  variant: link.isActive ? 'default' : 'ghost',
                } ),
                link.isActive
                  && 'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                'justify-start',
              ) }
            >
              <link.icon className='mr-2 h-4 w-4' />
              {link.title}
              {link.label && (
                <span
                  className={ cn(
                    'ml-auto',
                    link.isActive && 'text-background dark:text-white',
                  ) }
                >
                  {link.label}
                </span>
              )}
            </Link>
          ),
        )}
      </nav>
    </div>
  )
}
