export const USER_ROLE = {
    attendee: 'attendee',
    organizer: 'organizer'
} as const

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

