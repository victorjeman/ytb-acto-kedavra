import {
	BADGE_TYPE,
	BUTTON_TYPE,
	ICON_POSITION,
	NOTIFICATION_TYPE,
} from '~/common/constants/general.constants'
import { SIZE } from '~/common/constants/size.constants'

type BadgeKeys = keyof typeof BADGE_TYPE
type BadgeValues = typeof BADGE_TYPE[BadgeKeys]

type SizeKeys = keyof typeof SIZE
type SizeValues = typeof SIZE[SizeKeys]

type ButtonTypeKeys = keyof typeof BUTTON_TYPE
type ButtonTypeValues = typeof BUTTON_TYPE[ButtonTypeKeys]

type IconPositionKeys = keyof typeof ICON_POSITION
type IconPositionValues = typeof ICON_POSITION[IconPositionKeys]

type NotificationTypeKeys = keyof typeof NOTIFICATION_TYPE
type NotificationTypeValues = typeof NOTIFICATION_TYPE[NotificationTypeKeys]

export type BadgeType = BadgeValues
export type Size = SizeValues
export type ButtonType = ButtonTypeValues
export type IconPosition = IconPositionValues
export type NotificationType = NotificationTypeValues

export interface IActor {
	firstName: string
	lastName: string
	score: number
	job: string
	hobbies: string[]
	description: string
	image: string
	id?: number
	nanoid: string
}

export interface IBadge {
	id: string
	size: Size
	type: BadgeType
	text: string
}

export interface INotification {
	id: string
	type: NotificationType
	message: string
}
