# FinancialEvidence SDK utility: prepare_body
require_relative 'media'
module FinancialEvidenceUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return FinancialEvidenceUtilities.raw_body(ctx.reqdata) if FinancialEvidenceUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
