import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { paperTheme } from '../theme/paper-theme';

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexDirection: "row",
  }
});

export const Spinner: React.FC<{isLoading: boolean}> = (props) => {
  return (<>
    {
      props.isLoading
      ?
        <View style={styles.container}>
          <ActivityIndicator size="large" color={paperTheme.colors.primary} />
        </View>
      :
        props.children
    }
  </>);
}
