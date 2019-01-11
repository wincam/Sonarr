import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { icons } from 'Helpers/Props';
import IconButton from 'Components/Link/IconButton';
import VirtualTableHeader from 'Components/Table/VirtualTableHeader';
import VirtualTableHeaderCell from 'Components/Table/VirtualTableHeaderCell';
import TableOptionsModalWrapper from 'Components/Table/TableOptions/TableOptionsModalWrapper';
import SeriesIndexTableOptionsConnector from './SeriesIndexTableOptionsConnector';
import styles from './SeriesIndexHeader.css';

function SeriesIndexHeader(props) {
  const {
    showBanners,
    columns,
    onTableOptionChange,
    ...otherProps
  } = props;

  return (
    <VirtualTableHeader>
      {
        columns.map((column) => {
          const {
            name,
            label,
            isSortable,
            isVisible
          } = column;

          if (!isVisible) {
            return null;
          }

          if (name === 'actions') {
            return (
              <VirtualTableHeaderCell
                key={name}
                className={styles[name]}
                name={name}
                isSortable={false}
                {...otherProps}
              >

                <TableOptionsModalWrapper
                  columns={columns}
                  optionsComponent={SeriesIndexTableOptionsConnector}
                  onTableOptionChange={onTableOptionChange}
                >
                  <IconButton
                    name={icons.ADVANCED_SETTINGS}
                  />
                </TableOptionsModalWrapper>
              </VirtualTableHeaderCell>
            );
          }

          return (
            <VirtualTableHeaderCell
              key={name}
              className={classNames(
                styles[name],
                name === 'sortTitle' && showBanners && styles.banner
              )}
              name={name}
              isSortable={isSortable}
              {...otherProps}
            >
              {label}
            </VirtualTableHeaderCell>
          );
        })
      }
    </VirtualTableHeader>
  );
}

SeriesIndexHeader.propTypes = {
  showBanners: PropTypes.bool.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  onTableOptionChange: PropTypes.func.isRequired
};

export default SeriesIndexHeader;
