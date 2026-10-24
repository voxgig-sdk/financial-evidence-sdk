-- FinancialEvidence SDK exists test

local sdk = require("financial-evidence_sdk")

describe("FinancialEvidenceSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
