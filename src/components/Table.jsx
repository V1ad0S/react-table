import React, { useEffect, useRef } from 'react';

import './Table.css';


const TableHeader = ({ columns }) => {
  let sticky_index = 0;

  return (
    <thead className='table-header'>
      <tr>
        {columns.map((col) => (
          <th
            key={col.field}
            className={col.isSticky ? (++sticky_index) && `sticky sticky-${sticky_index}` : ''}
          >
            {col.label}
          </th>)
        )}
      </tr>
    </thead>
  );
}

const TableBody = ({ columns, data }) => {
  return (
    <tbody className='table-body'>
      {data.map((record) => <TableRow key={record.id} record={record} columns={columns} />)}
    </tbody>
  );
}

const TableRow = ({ record, columns }) => {
  let sticky_index = 0;

  return (
    <tr className='table-row'>
      {columns.map(({ field, isSticky }) => (
        <td
          key={field}
          className={isSticky ? (++sticky_index) && `sticky sticky-${sticky_index}` : ''}
        >
          {record[field]}
        </td>)
      )}
    </tr>
  );
}

const Table = ({ columns, data }) => {
  const tableRef = useRef(null);

  // dirty???
  useEffect(() => {
    const table = tableRef.current;

    const handleScroll = () => {
      const sticky_columns_headers = table.querySelectorAll('th.sticky');
      const leftOffsets = [0]; // contains left offsets for sticky columns
      sticky_columns_headers.forEach((el) => {
        const style = getComputedStyle(el);
        const width_fields = ['width', 'paddingLeft', 'paddingRight'];
        const elem_width = width_fields
          .map((f) => parseFloat(style[f]))
          .reduce((acc, cur) => acc + cur);
        leftOffsets.push(leftOffsets[leftOffsets.length - 1] + elem_width);
      });

      for (let i = 0; i < sticky_columns_headers.length; ++i) {
        sticky_columns_headers[i].style.left = leftOffsets[i] + 'px';
        const sticky_cells = table.querySelectorAll(`td.sticky-${i + 1}`);
        sticky_cells.forEach((cell) => { cell.style.left = leftOffsets[i] + 'px'; });
      }
      table.removeEventListener('scroll', handleScroll); // can be called only once -> immediately deleted
    }
    table.addEventListener('scroll', handleScroll);

    return () => {
      table.removeEventListener('scroll', handleScroll);
    };
  })

  return (
    <div ref={tableRef} className='table-responsive'>
      <table className="table-view">
        <TableHeader columns={columns} />
        <TableBody columns={columns} data={data} />
      </table>
    </div>
  );
}

export default Table;
