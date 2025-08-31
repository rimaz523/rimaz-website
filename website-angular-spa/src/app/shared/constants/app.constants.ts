export const appTheme = 'app-theme'
export const darkMode = 'dark-mode'

export const enum IconNames {
  github = 'Github',
  medium = 'Medium',
  linkedin = 'Linkedin',
  stackOverflow = 'Stackoverflow',
  twitterX = 'Twitter',
}
export const enum IconResourceUrls {
  github = 'custom-icons/github.svg',
  medium = 'custom-icons/medium.svg',
  linkedin = 'custom-icons/linkedin.svg',
  stackOverflow = 'custom-icons/stack-overflow.svg',
  twitterX = 'custom-icons/twitter-x.svg',
}

export const enum ErrorMessages {
  unknown = 'An unknown error occurred.',
}

export const enum Messages {
  contactSuccess = 'Thank you for your message!',
  tryAgainLater = 'Please try again later.',
}

export const enum HttpRequestHeaders {
  apimSubscriptionKey = 'ocp-apim-subscription-key',
}

export const enum ApiRoutes {
  socialHandles = 'socialhandles',
  articlePreviews = 'blogPreviews',
  message = 'message',
}

export enum OperationStatus {
  idle = 'idle',
  loading = 'loading',
  success = 'success',
  error = 'error',
}

export const enum CdnRoutes {
  heroImageDark = 'app/hero-dark.jpg',
  heroImageLight = 'app/hero-light.jpg',
}

export enum ButtonTexts {
  send = 'Send',
  dismiss = 'Dismiss',
}

export enum ValidationMessages {
  required = 'This field is required.',
  email = 'Please enter a valid email address.',
}
