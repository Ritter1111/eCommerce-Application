export function validateCapitalChar(password: string): boolean {
  const capital = /(?=.*[A-Z])/;
  return capital.test(password);
}

export function validateLowerChar(password: string): boolean {
  const capital = /(?=.*[a-z])/;
  return capital.test(password);
}

export function validateLengthPassword(password: string): boolean {
  const length = /(?=.{7,40}$)/;
  return length.test(password);
}

export function validateSpecialChar(password: string): boolean {
  const char = /[ -/:@[-`{-~]/;
  return char.test(password);
}

export function validateDigit(password: string): boolean {
  const digit = /(?=.*[0-9])/;
  return digit.test(password);
}

export function validateEmailFormat(email: string): boolean {
  const emailFormatRegex = /^\S+@\S+\.\S+$/;
  return emailFormatRegex.test(email);
}

export function validateNoSpaces(email: string): boolean {
  return !/\s/.test(email);
}

export function validatePasswordSpaces(password: string): boolean {
  const whitespaceRegex = /^\S(.*\S)?$/;
  return whitespaceRegex.test(password);
}

export function validateHasDomain(email: string): boolean {
  const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return domainRegex.test(email.split('@')[1]);
}

export function validateContainsAtSymbol(email: string): boolean {
  return email.includes('@');
}
