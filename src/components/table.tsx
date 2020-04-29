import React, { ReactElement, ReactDOM } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const tableStyle = StyleSheet.create({
    trailing: {
        display: 'flex',
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
    rowAction: (i: number) => void,
    trailing?: ReactElement
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
                                    <DataTable.Cell style={{flexGrow: 1, justifyContent: 'center'}} onPress={() => props.rowAction(index)}>
                                       <MaterialIcons name='close'/>
                                    </DataTable.Cell>
                                }
                            </DataTable.Row> : null
                    )
                }
                { props.trailing ? 
                    <DataTable.Row>
                            {props.trailing}
                    </DataTable.Row> : <></> }
            </DataTable>
        </View>
    );
}

export default Table;