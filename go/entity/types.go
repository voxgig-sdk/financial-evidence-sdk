// Typed models for the FinancialEvidence SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/financial-evidence-sdk/go/core"
)

// AgentQuery is the typed data model for the agent_query entity.
type AgentQuery struct {
}

// AgentQueryLoadMatch is the typed request payload for AgentQuery.LoadTyped.
type AgentQueryLoadMatch struct {
	Dataset string `json:"dataset"`
	EndDate *string `json:"end_date,omitempty"`
	Entity *string `json:"entity,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	PreviousRevision *string `json:"previous_revision,omitempty"`
	StartDate *string `json:"start_date,omitempty"`
}

// AgentReview is the typed data model for the agent_review entity.
type AgentReview struct {
}

// AgentReviewLoadMatch is the typed request payload for AgentReview.LoadTyped.
type AgentReviewLoadMatch struct {
	Bank *string `json:"bank,omitempty"`
	Limit *int `json:"limit,omitempty"`
	PreviousRevision *string `json:"previous_revision,omitempty"`
}

// Dataset is the typed data model for the dataset entity.
type Dataset struct {
}

// DatasetListMatch is the typed request payload for Dataset.ListTyped.
type DatasetListMatch struct {
}

// FundingReview is the typed data model for the funding_review entity.
type FundingReview struct {
}

// FundingReviewLoadMatch is the typed request payload for FundingReview.LoadTyped.
type FundingReviewLoadMatch struct {
}

// Query is the typed data model for the query entity.
type Query struct {
}

// QueryListMatch is the typed request payload for Query.ListTyped.
type QueryListMatch struct {
	Dataset string `json:"dataset"`
	EndDate *string `json:"end_date,omitempty"`
	Entity *string `json:"entity,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	StartDate *string `json:"start_date,omitempty"`
}

// Release is the typed data model for the release entity.
type Release struct {
}

// ReleaseLoadMatch is the typed request payload for Release.LoadTyped.
type ReleaseLoadMatch struct {
}

// Source is the typed data model for the source entity.
type Source struct {
}

// SourceListMatch is the typed request payload for Source.ListTyped.
type SourceListMatch struct {
	AbsencePolicy *string `json:"absence_policy,omitempty"`
	CarrierVerification *string `json:"carrier_verification,omitempty"`
	Dataset *string `json:"dataset,omitempty"`
	Description *string `json:"description,omitempty"`
	Diagnostics *[]any `json:"diagnostics,omitempty"`
	EvidenceStatus *string `json:"evidence_status,omitempty"`
	Limit *int `json:"limit,omitempty"`
	NextOffset *any `json:"next_offset,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Results *[]any `json:"results,omitempty"`
	ReturnedRows *int `json:"returned_rows,omitempty"`
	Schema *string `json:"schema,omitempty"`
	Sources *[]any `json:"sources,omitempty"`
	StatusSemantics *string `json:"status_semantics,omitempty"`
	TotalRows *int `json:"total_rows,omitempty"`
	TransportStatus *string `json:"transport_status,omitempty"`
}

// Start is the typed data model for the start entity.
type Start struct {
}

// StartLoadMatch is the typed request payload for Start.LoadTyped.
type StartLoadMatch struct {
}

// Workflow is the typed data model for the workflow entity.
type Workflow struct {
}

// WorkflowLoadMatch is the typed request payload for Workflow.LoadTyped.
type WorkflowLoadMatch struct {
	Selection string `json:"selection"`
	Workflow string `json:"workflow"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
