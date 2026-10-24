package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewAgentQueryEntityFunc func(client *FinancialEvidenceSDK, entopts map[string]any) FinancialEvidenceEntity

var NewAgentReviewEntityFunc func(client *FinancialEvidenceSDK, entopts map[string]any) FinancialEvidenceEntity

var NewDatasetEntityFunc func(client *FinancialEvidenceSDK, entopts map[string]any) FinancialEvidenceEntity

var NewFundingReviewEntityFunc func(client *FinancialEvidenceSDK, entopts map[string]any) FinancialEvidenceEntity

var NewQueryEntityFunc func(client *FinancialEvidenceSDK, entopts map[string]any) FinancialEvidenceEntity

var NewReleaseEntityFunc func(client *FinancialEvidenceSDK, entopts map[string]any) FinancialEvidenceEntity

var NewSourceEntityFunc func(client *FinancialEvidenceSDK, entopts map[string]any) FinancialEvidenceEntity

var NewStartEntityFunc func(client *FinancialEvidenceSDK, entopts map[string]any) FinancialEvidenceEntity

var NewWorkflowEntityFunc func(client *FinancialEvidenceSDK, entopts map[string]any) FinancialEvidenceEntity

