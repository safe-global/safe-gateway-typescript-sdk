const isProduction = process.env.REACT_APP_ENV === 'production'

export default {
  isProduction,
  baseUrl: isProduction
    ? 'https://safe-client.{network}.gnosis.io/v1'
    : 'https://safe-client.{network}.staging.gnosisdev.com/v1',
}

console.log(process.env.REACT_APP_ENV)
