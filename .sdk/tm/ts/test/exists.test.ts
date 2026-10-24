
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FinancialEvidenceSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = FinancialEvidenceSDK.test()
    equal(testsdk instanceof FinancialEvidenceSDK, true,
      'FinancialEvidenceSDK.test() must return a client synchronously')
  })

})
