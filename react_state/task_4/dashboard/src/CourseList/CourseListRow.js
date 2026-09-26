import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#f5f5f5ab',
  },

  rowChecked: {
    backgroundColor: '#e6e4e4',
  },

  headerRow: {
    backgroundColor: '#deb5b545',
  },

  headerTitleCell: {
    textAlign: 'center',
    borderBottom: '2px solid #ddd',
    padding: '8px',
  },

  headerCell: {
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
    padding: '8px',
  },

  cell: {
    textAlign: 'left',
    border: '1px solid #ddd',
    padding: '8px',
  },

  checkbox: {
    marginRight: '8px',
  },
});

export default function CourseListRow({ isHeader, textFirstCell, textSecondCell }) {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  const CellTag = isHeader ? 'th' : 'td';
  const cellStyle = isHeader ? styles.headerCell : styles.cell;

  let rowStyle = styles.row;
  if (isHeader) {
    rowStyle = styles.headerRow;
  } else if (checked) {
    rowStyle = styles.rowChecked;
  }

  return (
    <tr className={css(rowStyle)}>
      {isHeader && textSecondCell === null ? (
        <th colSpan="2" className={css(styles.headerTitleCell)}>
          {textFirstCell}
        </th>
      ) : (
        <React.Fragment>
          <CellTag className={css(cellStyle)}>
            {!isHeader && (
              <input
                type="checkbox"
                checked={checked}
                onChange={handleCheckboxChange}
                className={css(styles.checkbox)}
              />
            )}
            {textFirstCell}
          </CellTag>
          <CellTag className={css(cellStyle)}>{textSecondCell}</CellTag>
        </React.Fragment>
      )}
    </tr>
  );
}

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CourseListRow.defaultProps = {
  isHeader: false,
  textSecondCell: null,
};
