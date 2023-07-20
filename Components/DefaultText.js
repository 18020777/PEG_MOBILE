import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLORS} from "../colors";

const DefaultText = ({ style, children, onPress }) => (
	<Text onPress={onPress} style={[styles.text, style]}>{children}</Text>
);

const styles = StyleSheet.create({
	text: {
		color: COLORS.light
	},
});

export default DefaultText;
