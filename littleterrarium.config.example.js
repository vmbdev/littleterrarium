export const server = {
  port: 5015,
  useCors: true,
  corsOrigin: 'http://localhost:3000'
}

export const password = {
  length: 8,
  requireUppercase: true,
  requireNumber: true,
  requireNonAlphanumeric: true
}