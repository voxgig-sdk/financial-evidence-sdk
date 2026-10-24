# FinancialEvidence SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module FinancialEvidenceFeatures
  def self.make_feature(name)
    case name
    when "base"
      FinancialEvidenceBaseFeature.new
    when "ratelimit"
      FinancialEvidenceRatelimitFeature.new
    when "retry"
      FinancialEvidenceRetryFeature.new
    when "test"
      FinancialEvidenceTestFeature.new
    when "timeout"
      FinancialEvidenceTimeoutFeature.new
    else
      FinancialEvidenceBaseFeature.new
    end
  end
end
