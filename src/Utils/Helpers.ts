export const formatPhoneNumber = (number: string) =>
  number.replace(/\D+/g, '').replace(/(\d{3})(\d)(\d{3})(\d{4})/, '+$1 ($2) $3-$4');
