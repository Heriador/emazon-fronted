export enum TextType {
    P = 'p',
    SPAN = 'span',
    LABEL = 'label',
    H1 = 'h1',
    H2 = 'h2',
    H3 = 'h3',
    H4 = 'h4',
}

export enum NotificationType {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info',
    WARNING = 'warning',
}

export const IconType ={
    [NotificationType.INFO]: 'fa-solid fa-circle-info',
    [NotificationType.SUCCESS]: 'fa-solid fa-circle-check',
    [NotificationType.ERROR]:'fa-solid fa-circle-xmark',
    [NotificationType.WARNING]:'fa-solid fa-circle-exclamation',
}