import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    padding: 10
  }
});

export const Spinner: React.FC<{isLoading: boolean}> = (props) => {
  return (<>
    {
      props.isLoading
      ?
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#27ae60" />
        </View>
      :
        props.children
    }
  </>);
}
