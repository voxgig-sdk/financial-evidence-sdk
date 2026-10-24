# FinancialEvidence SDK exists test

require "minitest/autorun"
require_relative "../FinancialEvidence_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = FinancialEvidenceSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
