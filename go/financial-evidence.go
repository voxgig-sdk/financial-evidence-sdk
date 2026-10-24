package voxgigfinancialevidencesdk

import (
	"github.com/voxgig-sdk/financial-evidence-sdk/go/core"
	"github.com/voxgig-sdk/financial-evidence-sdk/go/entity"
	"github.com/voxgig-sdk/financial-evidence-sdk/go/feature"
	_ "github.com/voxgig-sdk/financial-evidence-sdk/go/utility"
)

// Type aliases preserve external API.
type FinancialEvidenceSDK = core.FinancialEvidenceSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type FinancialEvidenceEntity = core.FinancialEvidenceEntity
type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type FinancialEvidenceError = core.FinancialEvidenceError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewAgentQueryEntityFunc = func(client *core.FinancialEvidenceSDK, entopts map[string]any) core.FinancialEvidenceEntity {
		return entity.NewAgentQueryEntity(client, entopts)
	}
	core.NewAgentReviewEntityFunc = func(client *core.FinancialEvidenceSDK, entopts map[string]any) core.FinancialEvidenceEntity {
		return entity.NewAgentReviewEntity(client, entopts)
	}
	core.NewDatasetEntityFunc = func(client *core.FinancialEvidenceSDK, entopts map[string]any) core.FinancialEvidenceEntity {
		return entity.NewDatasetEntity(client, entopts)
	}
	core.NewFundingReviewEntityFunc = func(client *core.FinancialEvidenceSDK, entopts map[string]any) core.FinancialEvidenceEntity {
		return entity.NewFundingReviewEntity(client, entopts)
	}
	core.NewQueryEntityFunc = func(client *core.FinancialEvidenceSDK, entopts map[string]any) core.FinancialEvidenceEntity {
		return entity.NewQueryEntity(client, entopts)
	}
	core.NewReleaseEntityFunc = func(client *core.FinancialEvidenceSDK, entopts map[string]any) core.FinancialEvidenceEntity {
		return entity.NewReleaseEntity(client, entopts)
	}
	core.NewSourceEntityFunc = func(client *core.FinancialEvidenceSDK, entopts map[string]any) core.FinancialEvidenceEntity {
		return entity.NewSourceEntity(client, entopts)
	}
	core.NewStartEntityFunc = func(client *core.FinancialEvidenceSDK, entopts map[string]any) core.FinancialEvidenceEntity {
		return entity.NewStartEntity(client, entopts)
	}
	core.NewWorkflowEntityFunc = func(client *core.FinancialEvidenceSDK, entopts map[string]any) core.FinancialEvidenceEntity {
		return entity.NewWorkflowEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewFinancialEvidenceSDK = core.NewFinancialEvidenceSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewFinancialEvidenceSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *FinancialEvidenceSDK  { return NewFinancialEvidenceSDK(nil) }
func Test() *FinancialEvidenceSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
