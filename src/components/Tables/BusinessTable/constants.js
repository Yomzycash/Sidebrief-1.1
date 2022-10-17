import React from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { HeadText, BodyText, Checkbox } from './styles'
import { TypeIndicator } from 'components/Indicators'

const ColumnHelper = createColumnHelper()

export const businessTypes = [
  {
    name: 'c-corporation',
    code: 'CCORP',
    color: '#00D448',
  },
  {
    name: 'limited liablity company',
    code: 'LLC',
    color: '#00A2D4',
  },
  {
    name: 'public liablity company',
    code: 'PLC',
    color: '#D400CC',
  },
]

export const columns = [
  ColumnHelper.display({
    id: 'checkbox',
    header: ({ table }) => {
      return (
        <IndeterminateCheckbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      )
    },
    cell: ({ row }) => {
      return (
        <IndeterminateCheckbox
          checked={row.getIsSelected()}
          indeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      )
    },
  }),
  ColumnHelper.accessor('name', {
    header: () => <HeadText>Business Name</HeadText>,
    cell: (info) => <BodyText>{info.getValue()}</BodyText>,
  }),
  ColumnHelper.accessor('type', {
    header: () => <HeadText>Type</HeadText>,
    cell: (info) => {
      const typeName = info.getValue()
      // const color = businessTypes.find(
      // 	(type) => type.name === typeName
      // ).color;
      return <TypeIndicator color={'blue'} type={typeName} />
    },
  }),
  ColumnHelper.accessor('country', {
    header: () => <HeadText>Country</HeadText>,
    cell: (info) => <BodyText>{info.getValue()}</BodyText>,
  }),
  ColumnHelper.accessor('date', {
    header: () => <HeadText>Date</HeadText>,
    cell: (info) => <BodyText>{info.getValue()}</BodyText>,
  }),
]

const IndeterminateCheckbox = ({
  indeterminate,
  className = '',
  checked,
  ...rest
}) => {
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !checked && indeterminate
    }
  }, [ref, indeterminate, checked])

  return <Checkbox type="checkbox" ref={ref} checked={checked} {...rest} />
}
