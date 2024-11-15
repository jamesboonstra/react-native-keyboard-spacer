import React, { useEffect, useState, useCallback } from 'react';
import { Keyboard, LayoutAnimation, View, Dimensions, Platform, StyleSheet, KeyboardEvent, ViewStyle, LayoutAnimationConfig, KeyboardEventName } from 'react-native';

interface KeyboardSpacerProps {
	topSpacing?: number;
	onToggle?: (isKeyboardOpen: boolean, keyboardSpace: number) => void;
	style?: ViewStyle;
}

const styles = StyleSheet.create({
	container: {
		left: 0,
		right: 0,
		bottom: 0
	}
});

const defaultAnimation: LayoutAnimationConfig = {
	duration: 500,
	create: {
		duration: 300,
		type: LayoutAnimation.Types.easeInEaseOut,
		property: LayoutAnimation.Properties.opacity
	},
	update: {
		type: LayoutAnimation.Types.spring,
		springDamping: 200
	},
	delete: {
		duration: 300,
		type: LayoutAnimation.Types.easeInEaseOut,
		property: LayoutAnimation.Properties.opacity
	}
};

export const KeyboardSpacer: React.FC<KeyboardSpacerProps> = ({ topSpacing = 0, onToggle = () => undefined, style }) => {
	const [keyboardSpace, setKeyboardSpace] = useState(0);
	const [isKeyboardOpened, setIsKeyboardOpened] = useState(false);

	const updateKeyboardSpace = useCallback(
		(event: KeyboardEvent) => {
			if (!event.endCoordinates || isKeyboardOpened) return;

			let animationConfig = defaultAnimation;
			if (Platform.OS === 'ios') {
				animationConfig = LayoutAnimation.create(event.duration, LayoutAnimation.Types[event.easing], LayoutAnimation.Properties.opacity);
			}
			LayoutAnimation.configureNext(animationConfig);

			const screenHeight = Dimensions.get('window').height;
			const newKeyboardSpace = screenHeight - event.endCoordinates.screenY + topSpacing;

			setKeyboardSpace(newKeyboardSpace);
			setIsKeyboardOpened(true);
			onToggle(true, newKeyboardSpace);
		},
		[topSpacing, onToggle, isKeyboardOpened]
	);

	const resetKeyboardSpace = useCallback(
		(event: KeyboardEvent) => {
			if (!isKeyboardOpened) return;

			let animationConfig = defaultAnimation;
			if (Platform.OS === 'ios') {
				animationConfig = LayoutAnimation.create(event.duration, LayoutAnimation.Types[event.easing], LayoutAnimation.Properties.opacity);
			}
			LayoutAnimation.configureNext(animationConfig);

			setKeyboardSpace(0);
			setIsKeyboardOpened(false);
			onToggle(false, 0);
		},
		[onToggle, isKeyboardOpened]
	);

	useEffect(() => {
		const updateListener: KeyboardEventName = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
		const resetListener: KeyboardEventName = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';

		const keyboardWillShowListener = Keyboard.addListener(updateListener, updateKeyboardSpace);
		const keyboardWillHideListener = Keyboard.addListener(resetListener, resetKeyboardSpace);

		return () => {
			keyboardWillShowListener.remove();
			keyboardWillHideListener.remove();
		};
	}, [updateKeyboardSpace, resetKeyboardSpace]);

	return <View style={[styles.container, { height: Number(keyboardSpace) }, style]} />;
};

export default KeyboardSpacer;
