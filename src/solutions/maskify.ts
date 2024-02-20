export default function maskify(cc: string): string {
  const last4digits = cc.slice(-4);
  return last4digits.padStart(cc.length, '#');
}
// maskify('4556364607935616')
