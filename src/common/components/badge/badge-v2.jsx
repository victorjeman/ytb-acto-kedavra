import { SIZE } from '~/common/constants/size.constants'
import { BADGE_TYPE } from '~/common/constants/general.constants'

import styles from './badge.module.scss'

export const BadgeV2 = ({ children, type = BADGE_TYPE.PRIMARY, size = SIZE.BASE }) => {
	return (
		<span
			className={styles.badge}
			style={{
				'--badge-size': size,
				'--badge-color': `var(--badge-color-${type})`,
				'--badge-bg': `var(--badge-bg-${type})`,
				'--badge-padding': `var(--padding-${size})`,
				'--badge-border-radius': `var(--border-radius-${size})`,
			}}>
			{children}
		</span>
	)
}
