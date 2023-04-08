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
  cells: Array<keyof T[number]>;
  renderValues?: Partial<{
    [key in TableProps<T>['cells'][number]]: (
      value: TableProps<T>['data'][number][key],
    ) => React.ReactNode;
  }>;
}
export const Table = <T extends object[]>({ data, cells, renderValues }: TableProps<T>) => {
  const renderValueOrDefault = useCallback(
    (row: typeof data[number], key: string | number | symbol) => {
      const defaultValue = row[key as keyof typeof row];
      const transformedValue = Object.entries(renderValues ?? {}).find(([k]) => k === key);
      if (!transformedValue || !transformedValue[1]) return String(defaultValue);

      const transformableValue = transformedValue[1] as (value: unknown) => React.ReactNode;
      return transformableValue(defaultValue);
    },
    [renderValues, data, cells],
  );

  return (
    <TableContainer component={PaperContainer} sx={{ p: 0 }}>
      <DefaultTable>
        <TableHead>
          <TableRow>
            {cells.map((cell) => (
              <TableCell key={String(cell)}>{String(cell)}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((x, idx) => (
            <TableRow key={idx}>
              {cells.map((cell) => (
                <TableCell key={`${idx}-${String(cell)}`}>
                  {renderValueOrDefault(x, cell)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </DefaultTable>
    </TableContainer>
  );
};
