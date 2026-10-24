// Typed models for the FinancialEvidence SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface AgentQuery {
}

export interface AgentQueryLoadMatch {
  dataset: string
  end_date?: string
  entity?: string
  limit?: number
  offset?: number
  previous_revision?: string
  start_date?: string
}

export interface AgentReview {
}

export interface AgentReviewLoadMatch {
  bank?: string
  limit?: number
  previous_revision?: string
}

export interface Dataset {
}

export interface DatasetListMatch {
}

export interface FundingReview {
}

export interface FundingReviewLoadMatch {
}

export interface Query {
  absence_policy: string
  carrier_verification: string
  dataset: string
  description: string
  diagnostics: any[]
  evidence_status: string
  limit: number
  next_offset: any
  offset: number
  results: any[]
  returned_rows: number
  schema: string
  sources: any[]
  status_semantics: string
  total_rows: number
  transport_status: string
}

export interface QueryListMatch {
  dataset: string
  end_date?: string
  entity?: string
  limit?: number
  offset?: number
  start_date?: string
}

export interface Release {
}

export interface ReleaseLoadMatch {
}

export interface Source {
  absence_policy: string
  carrier_verification: string
  dataset: string
  description: string
  diagnostics: any[]
  evidence_status: string
  limit: number
  next_offset: any
  offset: number
  results: any[]
  returned_rows: number
  schema: string
  sources: any[]
  status_semantics: string
  total_rows: number
  transport_status: string
}

export interface SourceListMatch {
  absence_policy?: string
  carrier_verification?: string
  dataset?: string
  description?: string
  diagnostics?: any[]
  evidence_status?: string
  limit?: number
  next_offset?: any
  offset?: number
  results?: any[]
  returned_rows?: number
  schema?: string
  sources?: any[]
  status_semantics?: string
  total_rows?: number
  transport_status?: string
}

export interface Start {
}

export interface StartLoadMatch {
}

export interface Workflow {
}

export interface WorkflowLoadMatch {
  selection: string
  workflow: string
}

