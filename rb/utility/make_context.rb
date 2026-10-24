# FinancialEvidence SDK utility: make_context
require_relative '../core/context'
module FinancialEvidenceUtilities
  MakeContext = ->(ctxmap, basectx) {
    FinancialEvidenceContext.new(ctxmap, basectx)
  }
end
