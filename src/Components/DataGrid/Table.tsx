import DefaultTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useCallback } from 'react';
import { PaperContainer } from '../Containers';

type ObjectType = object[] | readonly object[];

interface TableProps<T extends ObjectType> {
  data: T;
  cells: Partial<{
    [key in keyof T[number]]: string;
  }>;
  renderValues?: Partial<{
    [key in keyof TableProps<T>['cells']]:
      | ((value: TableProps<T>['data'][number][key]) => React.ReactNode)
      | string;
  }>;
  actions?: (row: TableProps<T>['data'][number]) => React.ReactNode;
}
export const Table = <T extends ObjectType>({
  data,
  cells,
  renderValues,
  actions,
}: TableProps<T>) => {
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

  const renderRowActions = useCallback(
    (row: typeof data[number]) => {
      return actions?.(row);
    },
    [actions, data],
  );

  return (
    <TableContainer component={PaperContainer} sx={{ p: 0 }}>
      <DefaultTable
        size='small'
        sx={{
          '& th, & td': {
            borderBottom: '1px solid',
            borderBottomColor: 'divider',
          },
        }}
      >
        <TableHead>
          <TableRow>
            {Object.entries(cells).map(([key, replacement]) => (
              <TableCell key={key}>{String(replacement)}</TableCell>
            ))}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((x, idx) => (
            <TableRow key={idx}>
              {Object.entries(cells).map(([cellKey]) => (
                <TableCell key={`${idx}-${String(cellKey)}`}>
                  {renderValueOrDefault(x, cellKey)}
                </TableCell>
              ))}
              <TableCell align='right'>{renderRowActions(x)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </DefaultTable>
    </TableContainer>
  );
};
