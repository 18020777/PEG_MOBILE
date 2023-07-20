import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLORS} from "../colors";

const DarkText = ({ style, children }) => (
	<Text style={[styles.text, style]}>{children}</Text>
);

const styles = StyleSheet.create({
	text: {
		color: COLORS.dark
	},
});

export default DarkText;
