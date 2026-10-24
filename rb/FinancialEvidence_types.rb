# frozen_string_literal: true

# Typed models for the FinancialEvidence SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# AgentQuery entity data model.
class AgentQuery
end

# Request payload for AgentQuery#load.
#
# @!attribute [rw] dataset
#   @return [String]
#
# @!attribute [rw] end_date
#   @return [String, nil]
#
# @!attribute [rw] entity
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] previous_revision
#   @return [String, nil]
#
# @!attribute [rw] start_date
#   @return [String, nil]
AgentQueryLoadMatch = Struct.new(
  :dataset,
  :end_date,
  :entity,
  :limit,
  :offset,
  :previous_revision,
  :start_date,
  keyword_init: true
)

# AgentReview entity data model.
class AgentReview
end

# Request payload for AgentReview#load.
#
# @!attribute [rw] bank
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] previous_revision
#   @return [String, nil]
AgentReviewLoadMatch = Struct.new(
  :bank,
  :limit,
  :previous_revision,
  keyword_init: true
)

# Dataset entity data model.
class Dataset
end

# Request payload for Dataset#list.
class DatasetListMatch
end

# FundingReview entity data model.
class FundingReview
end

# Request payload for FundingReview#load.
class FundingReviewLoadMatch
end

# Query entity data model.
#
# @!attribute [rw] absence_policy
#   @return [String]
#
# @!attribute [rw] carrier_verification
#   @return [String]
#
# @!attribute [rw] dataset
#   @return [String]
#
# @!attribute [rw] description
#   @return [String]
#
# @!attribute [rw] diagnostics
#   @return [Array]
#
# @!attribute [rw] evidence_status
#   @return [String]
#
# @!attribute [rw] limit
#   @return [Integer]
#
# @!attribute [rw] next_offset
#   @return [Object]
#
# @!attribute [rw] offset
#   @return [Integer]
#
# @!attribute [rw] results
#   @return [Array]
#
# @!attribute [rw] returned_rows
#   @return [Integer]
#
# @!attribute [rw] schema
#   @return [String]
#
# @!attribute [rw] sources
#   @return [Array]
#
# @!attribute [rw] status_semantics
#   @return [String]
#
# @!attribute [rw] total_rows
#   @return [Integer]
#
# @!attribute [rw] transport_status
#   @return [String]
Query = Struct.new(
  :absence_policy,
  :carrier_verification,
  :dataset,
  :description,
  :diagnostics,
  :evidence_status,
  :limit,
  :next_offset,
  :offset,
  :results,
  :returned_rows,
  :schema,
  :sources,
  :status_semantics,
  :total_rows,
  :transport_status,
  keyword_init: true
)

# Request payload for Query#list.
#
# @!attribute [rw] dataset
#   @return [String]
#
# @!attribute [rw] end_date
#   @return [String, nil]
#
# @!attribute [rw] entity
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] start_date
#   @return [String, nil]
QueryListMatch = Struct.new(
  :dataset,
  :end_date,
  :entity,
  :limit,
  :offset,
  :start_date,
  keyword_init: true
)

# Release entity data model.
class Release
end

# Request payload for Release#load.
class ReleaseLoadMatch
end

# Source entity data model.
#
# @!attribute [rw] absence_policy
#   @return [String]
#
# @!attribute [rw] carrier_verification
#   @return [String]
#
# @!attribute [rw] dataset
#   @return [String]
#
# @!attribute [rw] description
#   @return [String]
#
# @!attribute [rw] diagnostics
#   @return [Array]
#
# @!attribute [rw] evidence_status
#   @return [String]
#
# @!attribute [rw] limit
#   @return [Integer]
#
# @!attribute [rw] next_offset
#   @return [Object]
#
# @!attribute [rw] offset
#   @return [Integer]
#
# @!attribute [rw] results
#   @return [Array]
#
# @!attribute [rw] returned_rows
#   @return [Integer]
#
# @!attribute [rw] schema
#   @return [String]
#
# @!attribute [rw] sources
#   @return [Array]
#
# @!attribute [rw] status_semantics
#   @return [String]
#
# @!attribute [rw] total_rows
#   @return [Integer]
#
# @!attribute [rw] transport_status
#   @return [String]
Source = Struct.new(
  :absence_policy,
  :carrier_verification,
  :dataset,
  :description,
  :diagnostics,
  :evidence_status,
  :limit,
  :next_offset,
  :offset,
  :results,
  :returned_rows,
  :schema,
  :sources,
  :status_semantics,
  :total_rows,
  :transport_status,
  keyword_init: true
)

# Request payload for Source#list.
#
# @!attribute [rw] absence_policy
#   @return [String, nil]
#
# @!attribute [rw] carrier_verification
#   @return [String, nil]
#
# @!attribute [rw] dataset
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] diagnostics
#   @return [Array, nil]
#
# @!attribute [rw] evidence_status
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] next_offset
#   @return [Object, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] results
#   @return [Array, nil]
#
# @!attribute [rw] returned_rows
#   @return [Integer, nil]
#
# @!attribute [rw] schema
#   @return [String, nil]
#
# @!attribute [rw] sources
#   @return [Array, nil]
#
# @!attribute [rw] status_semantics
#   @return [String, nil]
#
# @!attribute [rw] total_rows
#   @return [Integer, nil]
#
# @!attribute [rw] transport_status
#   @return [String, nil]
SourceListMatch = Struct.new(
  :absence_policy,
  :carrier_verification,
  :dataset,
  :description,
  :diagnostics,
  :evidence_status,
  :limit,
  :next_offset,
  :offset,
  :results,
  :returned_rows,
  :schema,
  :sources,
  :status_semantics,
  :total_rows,
  :transport_status,
  keyword_init: true
)

# Start entity data model.
class Start
end

# Request payload for Start#load.
class StartLoadMatch
end

# Workflow entity data model.
class Workflow
end

# Request payload for Workflow#load.
#
# @!attribute [rw] selection
#   @return [String]
#
# @!attribute [rw] workflow
#   @return [String]
WorkflowLoadMatch = Struct.new(
  :selection,
  :workflow,
  keyword_init: true
)

