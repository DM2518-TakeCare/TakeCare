import React, { ReactElement, ReactDOM } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { DataTable } from 'react-native-paper';

const tableStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
});

interface ColumnData {
    data: (ReactElement | string)
    alignment?: 'left' | 'right'
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
    tableData: (ReactElement | string)[][]
}

export const Table: React.FC<TableProps> = (props) => {
    return (
        <View>
            <DataTable>
                <DataTable.Header>
                    {
                        props.tableTitles.map((title, key) => {
                            return <DataTable.Title numeric={title.alignment === 'right' ? true : false}  key={key}>
                                {title.data}
                            </DataTable.Title>
                        })
                    }
                </DataTable.Header>

                {
                    props.tableData.map((row, index) => 
                        <DataTable.Row  key={index}>
                            {
                                row.map((cell, index) =>
                                    <DataTable.Cell key={index}>
                                        {cell}
                                    </DataTable.Cell>
                                )
                            }
                        </DataTable.Row>
                    )
                }
            </DataTable>
        </View>
    );
}

export default Table;