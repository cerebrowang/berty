import React, { useEffect } from 'react'
import { View, TouchableOpacity, Text as TextNative, StyleSheet, SafeAreaView } from 'react-native'
import { Text, Icon } from 'react-native-ui-kitten'
import { useNavigation } from '@react-navigation/native'
import { useStyles } from '@berty-tech/styles'
import messengerMethodsHooks from '@berty-tech/store/methods'

import Avatar from './Buck_Berty.svg'
import BlurView from '../shared-components/BlurView'

const useStylesAddBetabot = () => {
	const [{ width, border, padding, margin }] = useStyles()
	return {
		skipButton: [
			border.color.light.grey,
			border.scale(2),
			border.radius.small,
			margin.top.scale(15),
			padding.left.small,
			padding.right.medium,
			padding.top.small,
			padding.bottom.small,
			width(120),
		],
		addButton: [
			border.color.light.blue,
			border.scale(2),
			border.radius.small,
			margin.top.scale(15),
			padding.left.small,
			padding.right.medium,
			padding.top.small,
			padding.bottom.small,
			width(120),
		],
	}
}

export const AddBetabotBody = () => {
	const [{ row, text, margin, color, absolute, padding, background, border, opacity }] = useStyles()
	const _styles = useStylesAddBetabot()
	const navigation = useNavigation()
	const { refresh: requestContact, error, done } = messengerMethodsHooks.useContactRequest()

	useEffect(() => {
		if (done && !error) {
			navigation.goBack()
		}
	}, [done, error, navigation])

	return (
		<View style={[{ justifyContent: 'center', alignItems: 'center', height: '100%' }, padding.big]}>
			<View
				style={[
					background.white,
					padding.horizontal.medium,
					padding.bottom.medium,
					border.radius.large,
					{ width: '100%' },
				]}
			>
				<View style={[absolute.scale({ top: -70 }), row.item.justify, border.shadow.large]}>
					<Avatar width={120} height={120} />
				</View>
				<View style={[padding.top.scale(55)]}>
					<Icon
						name='info-outline'
						fill={color.blue}
						width={60}
						height={60}
						style={[row.item.justify, padding.top.large]}
					/>
					<TextNative
						style={[
							text.align.center,
							padding.top.medium,
							text.size.large,
							text.bold.small,
							text.color.black,
							{ fontFamily: 'Open Sans' },
						]}
					>
						👋 ADD BETA BOT?
					</TextNative>
					<Text style={[text.align.center, padding.top.medium, padding.horizontal.medium]}>
						<Text>You don't have any contacts yet would you like to add the</Text>
						<TextNative style={[text.bold.medium, text.color.black, { fontFamily: 'Open Sans' }]}>
							{' '}
							Beta Bot
						</TextNative>
						<Text> to discover and test conversations?</Text>
					</Text>
				</View>
				<View style={[row.center, padding.top.medium]}>
					<TouchableOpacity
						style={[row.fill, margin.bottom.medium, opacity(0.5), _styles.skipButton]}
						onPress={() => navigation.goBack()}
					>
						<Icon name='close' width={30} height={30} fill={color.grey} style={row.item.justify} />
						<TextNative
							style={[
								text.color.grey,
								padding.left.small,
								row.item.justify,
								text.size.scale(16),
								text.bold.medium,
								{ fontFamily: 'Open Sans' },
							]}
						>
							SKIP
						</TextNative>
					</TouchableOpacity>
					<TouchableOpacity
						style={[row.fill, margin.bottom.medium, background.light.blue, _styles.addButton]}
						onPress={() =>
							requestContact({
								link:
									// TODO variable env with betabot link
									'https://berty.tech/id#key=CiAeFl27r02orxVgzNizJu6ybew_7wFIfOLKMQ_CwtX77BIgYMR3XA3omKPBJz3kMh8yFaslfvOsYD710GUIivSyJ54&name=beta-bot',
							})
						}
					>
						<Icon
							name='checkmark-outline'
							width={30}
							height={30}
							fill={color.blue}
							style={row.item.justify}
						/>
						<TextNative
							style={[
								text.color.blue,
								padding.left.small,
								row.item.justify,
								text.size.scale(16),
								text.bold.medium,
							]}
						>
							ADD !
						</TextNative>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

export const AddBetabot = () => {
	const [{ border }] = useStyles()
	return (
		<>
			<BlurView style={[StyleSheet.absoluteFill]} blurType='light' />
			<SafeAreaView style={[border.shadow.huge]}>
				<AddBetabotBody />
			</SafeAreaView>
		</>
	)
}

export default AddBetabot
