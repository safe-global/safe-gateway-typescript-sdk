export default {
  baseUrl: process.env.NODE_ENV === 'production'
    ? 'https://safe-client.{network}.gnosis.io/v1'
    : 'https://safe-client.{network}.staging.gnosisdev.com/v1',
}
