import React, { useCallback, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

export const QueueGrid = ({ recordData, selectedRecords }) => {
  const gridRef = React.useRef(null);
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { headerName: 'Job ID', field: 'job_id' },
    { headerName: 'Queue Selected', field: 'queue_selected' },
    { headerName: 'Priority Offset', field: 'priority_offset' },
    { headerName: 'Version', field: 'version', filter: true },
    { headerName: 'Created', field: 'created' },
    { headerName: 'Updated', field: 'updated' },
    { headerName: 'Status', field: 'status' },
    { headerName: 'Visibility Timeout', field: 'visibility_timeout' },
  ]);
  useEffect(() => {
    console.log(recordData);
    setRowData(recordData);
  }, [recordData]);
  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    selectedRecords(selectedRows);
  }, []);
  return (
    <div className={'ag-theme-quartz'} style={{ height: 400, width: '100%' }}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={colDefs}
        rowSelection={'multiple'}
        onSelectionChanged={onSelectionChanged}
      />
    </div>
  );
};
