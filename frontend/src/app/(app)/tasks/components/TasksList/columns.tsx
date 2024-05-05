'use client'

import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './DataTableColumnHeader'
import {
  ArchiveIcon,
  CircleIcon,
  TimerIcon,
  CheckCircle,
  CircleXIcon,
  ArrowRightIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'

export const statuses = [
  {
    icon: ArchiveIcon,
    label: 'Backlog',
    value: 'backlog',
  },
  {
    icon: CircleIcon,
    label: 'Todo',
    value: 'todo',
  },
  {
    icon: TimerIcon,
    label: 'In Progress',
    value: 'in progress',
  },
  {
    icon: CheckCircle,
    label: 'Done',
    value: 'done',
  },
  {
    icon: CircleXIcon,
    label: 'Canceled',
    value: 'canceled',
  },
]

export const priorities = [
  {
    icon: ArrowDownIcon,
    label: 'Low',
    value: 'low',
  },
  {
    icon: ArrowRightIcon,
    label: 'Medium',
    value: 'medium',
  },
  {
    icon: ArrowUpIcon,
    label: 'High',
    value: 'high',
  },
]

export const labels = [
  {
    label: 'Bug',
    value: 'bug',
  },
  {
    label: 'Feature',
    value: 'feature',
  },
  {
    label: 'Documentation',
    value: 'documentation',
  },
]

interface Task {
  id: string;
  label: string;
  priority: string;
  status: string;
  title: string;
}
export const columns: ColumnDef<Task>[] = [
  {
    cell: ( { row } ) => (
      <Checkbox
        checked={ row.getIsSelected() }
        onCheckedChange={ ( value ) => row.toggleSelected( !!value ) }
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableHiding: false,
    enableSorting: false,
    header: ( { table } ) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
          || ( table.getIsSomePageRowsSelected() && 'indeterminate' )
        }
        onCheckedChange={ ( value ) => table.toggleAllPageRowsSelected( !!value ) }
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    id: 'select',
  },
  {
    accessorKey: 'id',
    cell: ( { row } ) => <div className='w-[80px]'>{row.getValue( 'id' )}</div>,
    enableHiding: false,
    enableSorting: false,
    header: ( { column } ) => (
      <DataTableColumnHeader column={ column } title='Task' />
    ),
  },
  {
    accessorKey: 'title',
    cell: ( { row } ) => {
      const label = labels.find( ( label ) => label.value === row.original.label )

      return (
        <div className='flex space-x-2'>
          {label && <Badge variant='outline'>{label.label}</Badge>}
          <span className='max-w-[500px] truncate font-medium'>
            {row.getValue( 'title' )}
          </span>
        </div>
      )
    },
    header: ( { column } ) => (
      <DataTableColumnHeader column={ column } title='Title' />
    ),
  },
  {
    accessorKey: 'status',

    cell: ( { row } ) => {
      const status = statuses.find(
        ( status ) => status.value === row.getValue( 'status' ),
      )

      if ( !status ) {
        return null
      }

      return (
        <div className='flex w-[100px] items-center'>
          {status.icon && (
            <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: ( row, id, value ) => value.includes( row.getValue( id ) ),
    header: ( { column } ) => (
      <DataTableColumnHeader column={ column } title='Status' />
    ),
  },
  {
    accessorKey: 'priority',
    cell: ( { row } ) => {
      const priority = priorities.find(
        ( priority ) => priority.value === row.getValue( 'priority' ),
      )

      if ( !priority ) {
        return null
      }

      return (
        <div className='flex items-center'>
          {priority.icon && (
            <priority.icon className='mr-2 h-4 w-4 text-muted-foreground' />
          )}
          <span>{priority.label}</span>
        </div>
      )
    },
    filterFn: ( row, id, value ) => value.includes( row.getValue( id ) ),
    header: ( { column } ) => (
      <DataTableColumnHeader column={ column } title='Priority' />
    ),
  },
  // {
  //   cell: ( { row } ) => <DataTableRowActions row={ row } />,
  //   id: 'actions',
  // },
]
