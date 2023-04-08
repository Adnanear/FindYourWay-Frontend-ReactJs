import DefaultTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useCallback } from 'react';
import { PaperContainer } from '../Containers';

interface TableProps<T extends object[]> {
  data: T;
  cells: Partial<{
    [key in keyof T[number]]: string;
  }>;
  renderValues?: Partial<{
    [key in keyof TableProps<T>['cells']]:
      | ((value: TableProps<T>['data'][number][key]) => React.ReactNode)
      | string;
  }>;
}
export const Table = <T extends object[]>({ data, cells, renderValues }: TableProps<T>) => {
  const renderValueOrDefault = useCallback(
    (row: typeof data[number], key: string | number | symbol) => {
      const defaultValue = row[key as keyof typeof row];
      const transformedValue = Object.entries(renderValues ?? {}).find(([k]) => k === key);
      if (!transformedValue || !transformedValue[1]) return String(defaultValue);

      const transformableValue = transformedValue[1] as
        | ((value: unknown) => React.ReactNode)
        | string;

      return typeof transformableValue === 'function'
        ? transformableValue(defaultValue)
        : transformableValue;
    },
    [renderValues, data, cells],
  );

  return (
    <TableContainer component={PaperContainer} sx={{ p: 0 }}>
      <DefaultTable size='small'>
        <TableHead>
          <TableRow>
            {Object.entries(cells).map(([key, replacement]) => (
              <TableCell key={key} sx={{ borderBottom: '1px solid', borderBottomColor: 'divider' }}>
                {String(replacement)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((x, idx) => (
            <TableRow key={idx}>
              {Object.entries(cells).map(([cellKey]) => (
                <TableCell
                  key={`${idx}-${String(cellKey)}`}
                  sx={{ borderBottom: '1px solid', borderBottomColor: 'divider' }}
                >
                  {renderValueOrDefault(x, cellKey)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </DefaultTable>
    </TableContainer>
  );
};
