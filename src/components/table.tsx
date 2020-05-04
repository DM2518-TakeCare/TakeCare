import React, { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { DataTable } from 'react-native-paper';

const styles = StyleSheet.create({
    rowEnd: {
        flexGrow: 1, 
        justifyContent: 'center',
    },
});

interface ColumnData {
    data: (ReactElement | string)
    alignment?: 'left' | 'right'
}

interface TableProps {
    tableTitles: ColumnData[],
    
    /**
     * The table data as a matrix: 
     * [[a],[b],[c],[d]],
     * [[a],[b],[c],[d]],
     * [[a],[b],[c],[d]],
     * [[a],[b],[c],[d]],
     */
    tableData: (ReactElement | string)[][],
    rowEnd?: ReactElement,
    rowEndAction?: (i: number) => void,
    trailing?: ReactElement,
}

export const Table: React.FC<TableProps> = ({tableTitles, tableData, rowEnd, rowEndAction=()=>{}, trailing}) => {
    return (
        <View>
            <DataTable>
                <DataTable.Header>
                    {
                        tableTitles.map((title, key) => {
                            return <DataTable.Title numeric={title.alignment === 'right' ? true : false}  key={key}>
                                {title.data}
                            </DataTable.Title>
                        })
                    }
                </DataTable.Header>

                {
                    tableData.map((row, index) => 
                        row.length > 0 ? 
                            <DataTable.Row key={index}>
                                {
                                    row.map((cell, index) =>
                                        <DataTable.Cell key={index}>
                                            {cell}
                                        </DataTable.Cell>
                                    )
                                }
                                { 
                                    rowEnd ? 
                                        <DataTable.Cell style={styles.rowEnd} onPress={() => rowEndAction(index)}>
                                            {rowEnd}
                                        </DataTable.Cell> 
                                    : <></>
                                }
                            </DataTable.Row> : null
                    )
                }
                { trailing ? 
                    <DataTable.Row>
                            {trailing}
                    </DataTable.Row> : <></> 
                }
            </DataTable>
        </View>
    );
}

export default Table;