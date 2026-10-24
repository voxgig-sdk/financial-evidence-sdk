-- Typed models for the FinancialEvidence SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class AgentQuery

---@class AgentQueryLoadMatch
---@field dataset string
---@field end_date? string
---@field entity? string
---@field limit? number
---@field offset? number
---@field previous_revision? string
---@field start_date? string

---@class AgentReview

---@class AgentReviewLoadMatch
---@field bank? string
---@field limit? number
---@field previous_revision? string

---@class Dataset

---@class DatasetListMatch

---@class FundingReview

---@class FundingReviewLoadMatch

---@class Query
---@field absence_policy string
---@field carrier_verification string
---@field dataset string
---@field description string
---@field diagnostics table
---@field evidence_status string
---@field limit number
---@field next_offset any
---@field offset number
---@field results table
---@field returned_rows number
---@field schema string
---@field sources table
---@field status_semantics string
---@field total_rows number
---@field transport_status string

---@class QueryListMatch
---@field dataset string
---@field end_date? string
---@field entity? string
---@field limit? number
---@field offset? number
---@field start_date? string

---@class Release

---@class ReleaseLoadMatch

---@class Source
---@field absence_policy string
---@field carrier_verification string
---@field dataset string
---@field description string
---@field diagnostics table
---@field evidence_status string
---@field limit number
---@field next_offset any
---@field offset number
---@field results table
---@field returned_rows number
---@field schema string
---@field sources table
---@field status_semantics string
---@field total_rows number
---@field transport_status string

---@class SourceListMatch
---@field absence_policy? string
---@field carrier_verification? string
---@field dataset? string
---@field description? string
---@field diagnostics? table
---@field evidence_status? string
---@field limit? number
---@field next_offset? any
---@field offset? number
---@field results? table
---@field returned_rows? number
---@field schema? string
---@field sources? table
---@field status_semantics? string
---@field total_rows? number
---@field transport_status? string

---@class Start

---@class StartLoadMatch

---@class Workflow

---@class WorkflowLoadMatch
---@field selection string
---@field workflow string

local M = {}

return M
