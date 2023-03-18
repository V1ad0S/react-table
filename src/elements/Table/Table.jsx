import React from 'react';

import styles from './Table.module.less';


const TableCell = ({ children, width, className, style }) => {
  const cellClassName = `${styles.tableCell} ${className || ""}`;
  // may be `styled component` ???
  const cellStyle = {
    ...style,
    width: width + 'em',
  }
  return (
    <div className={cellClassName} style={cellStyle}>{children}</div>
  );
}

const StickyTableCell = ({ width, leftOffset, children }) => {
  // may be `styled component` ???
  const stickyStyle = {
    left: leftOffset + 'em',
  };
  return (
    <TableCell
      width={width}
      className={styles.sticky}
      style={stickyStyle}
    >
      {children}
    </TableCell>
  );
}

const TableHeader = ({ children }) => {
  return (
    <div className={styles.tableHeader}>
      {children}
    </div>
  );
}

function createTableRow(cellsWidths, stickyColIndexes) {
  const leftOffsets = [0];
  stickyColIndexes.forEach((idx) => {
    leftOffsets.push(leftOffsets[leftOffsets.length - 1] + cellsWidths[idx]);
  })

  const TableRow = ({ record }) => {
    let stickyIndex = 0;
    return (
      <div className={styles.tableRow}>
        {
          Object.values(record).map((item, idx) => {
            const width = cellsWidths[idx];
            if (stickyColIndexes.includes(idx)) {
              const leftOffset = leftOffsets[stickyIndex];
              stickyIndex++;
              return <StickyTableCell key={idx} width={width} leftOffset={leftOffset}>{item}</StickyTableCell>;
            } else {
              return <TableCell key={idx} width={width}>{item}</TableCell>;
            }
          })
        }
      </div>
    );
  }

  return TableRow;
}


const Table = ({ data, labels, widths, stickyIndexes }) => {
  labels = labels || Object.keys(data[0]);
  widths = widths || Array(labels.length).fill(15);
  stickyIndexes = stickyIndexes || [];
  const TableRow = createTableRow(widths, stickyIndexes);
  return (
    <div className={styles.tableResponsive}>
      <div className={styles.tableView}>
        <TableHeader>
          <TableRow record={labels} />
        </TableHeader>
        {data.map((item, idx) => <TableRow key={idx} record={item} />)}
      </div>
    </div>
  );
}

export default Table;
