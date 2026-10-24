# FinancialEvidence SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

FinancialEvidenceUtility.registrar = ->(u) {
  u.clean = FinancialEvidenceUtilities::Clean
  u.clean_add = FinancialEvidenceUtilities::CleanAdd
  u.clean_explain = FinancialEvidenceUtilities::CleanExplain
  u.done = FinancialEvidenceUtilities::Done
  u.make_error = FinancialEvidenceUtilities::MakeError
  u.feature_add = FinancialEvidenceUtilities::FeatureAdd
  u.feature_hook = FinancialEvidenceUtilities::FeatureHook
  u.feature_init = FinancialEvidenceUtilities::FeatureInit
  u.fetcher = FinancialEvidenceUtilities::Fetcher
  u.make_fetch_def = FinancialEvidenceUtilities::MakeFetchDef
  u.make_context = FinancialEvidenceUtilities::MakeContext
  u.make_options = FinancialEvidenceUtilities::MakeOptions
  u.make_request = FinancialEvidenceUtilities::MakeRequest
  u.make_response = FinancialEvidenceUtilities::MakeResponse
  u.make_result = FinancialEvidenceUtilities::MakeResult
  u.make_point = FinancialEvidenceUtilities::MakePoint
  u.make_spec = FinancialEvidenceUtilities::MakeSpec
  u.make_url = FinancialEvidenceUtilities::MakeUrl
  u.param = FinancialEvidenceUtilities::Param
  u.prepare_auth = FinancialEvidenceUtilities::PrepareAuth
  u.prepare_body = FinancialEvidenceUtilities::PrepareBody
  u.prepare_headers = FinancialEvidenceUtilities::PrepareHeaders
  u.prepare_method = FinancialEvidenceUtilities::PrepareMethod
  u.prepare_params = FinancialEvidenceUtilities::PrepareParams
  u.prepare_path = FinancialEvidenceUtilities::PreparePath
  u.prepare_query = FinancialEvidenceUtilities::PrepareQuery
  u.graphql_body = FinancialEvidenceUtilities::GraphqlBody
  u.graphql_errors = FinancialEvidenceUtilities::GraphqlErrors
  u.result_basic = FinancialEvidenceUtilities::ResultBasic
  u.result_body = FinancialEvidenceUtilities::ResultBody
  u.result_headers = FinancialEvidenceUtilities::ResultHeaders
  u.transform_request = FinancialEvidenceUtilities::TransformRequest
  u.transform_response = FinancialEvidenceUtilities::TransformResponse
}
