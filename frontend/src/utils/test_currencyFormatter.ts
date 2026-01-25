import { formatCurrency, parseCurrency } from './currencyFormatter';

const testCases = [
  { raw: 25, expected: 'R$ 0,25' }, // Note: nbsp might be present
  { raw: 123, expected: 'R$ 1,23' },
  { raw: 1000, expected: 'R$ 10,00' },
  { raw: 45000, expected: 'R$ 450,00' },
  { raw: -25, expected: 'R$ 0,25' },
];

console.log('--- Testing formatCurrency ---');
testCases.forEach(({ raw, expected }) => {
  const result = formatCurrency(raw);
  // Normalize spaces to avoid nbsp issues in comparison, if needed, or just print
  console.log(`Input: ${raw}, Expected: ${expected}, Got: ${result}, Match: ${result.replace(/\u00a0/g, ' ') === expected.replace(/\u00a0/g, ' ')}`);
});

console.log('\n--- Testing parseCurrency ---');
testCases.forEach(({ raw, expected }) => {
    const input = expected; // We assume expected format is what we parse back, or close to it
    const expectedRaw = Math.abs(raw);
    const result = parseCurrency(input);
    console.log(`Input: "${input}", Expected: ${expectedRaw}, Got: ${result}, Match: ${result === expectedRaw}`);
});

const manualCases = [
    { input: 'R$ 0,25', expected: 25 },
    { input: 'R$ 1,23', expected: 123 },
    { input: '12,34', expected: 1234 },
];

manualCases.forEach(({ input, expected }) => {
    const result = parseCurrency(input);
    console.log(`Input: "${input}", Expected: ${expected}, Got: ${result}, Match: ${result === expected}`);
});
