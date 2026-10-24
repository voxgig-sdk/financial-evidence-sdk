<?php
declare(strict_types=1);

// Typed models for the FinancialEvidence SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** AgentQuery entity data model. */
class AgentQuery
{
}

/** Request payload for AgentQuery#load. */
class AgentQueryLoadMatch
{
    public string $dataset;
    public ?string $end_date = null;
    public ?string $entity = null;
    public ?int $limit = null;
    public ?int $offset = null;
    public ?string $previous_revision = null;
    public ?string $start_date = null;
}

/** AgentReview entity data model. */
class AgentReview
{
}

/** Request payload for AgentReview#load. */
class AgentReviewLoadMatch
{
    public ?string $bank = null;
    public ?int $limit = null;
    public ?string $previous_revision = null;
}

/** Dataset entity data model. */
class Dataset
{
}

/** Request payload for Dataset#list. */
class DatasetListMatch
{
}

/** FundingReview entity data model. */
class FundingReview
{
}

/** Request payload for FundingReview#load. */
class FundingReviewLoadMatch
{
}

/** Query entity data model. */
class Query
{
    public string $absence_policy;
    public string $carrier_verification;
    public string $dataset;
    public string $description;
    public array $diagnostics;
    public string $evidence_status;
    public int $limit;
    public mixed $next_offset;
    public int $offset;
    public array $results;
    public int $returned_rows;
    public string $schema;
    public array $sources;
    public string $status_semantics;
    public int $total_rows;
    public string $transport_status;
}

/** Request payload for Query#list. */
class QueryListMatch
{
    public string $dataset;
    public ?string $end_date = null;
    public ?string $entity = null;
    public ?int $limit = null;
    public ?int $offset = null;
    public ?string $start_date = null;
}

/** Release entity data model. */
class Release
{
}

/** Request payload for Release#load. */
class ReleaseLoadMatch
{
}

/** Source entity data model. */
class Source
{
    public string $absence_policy;
    public string $carrier_verification;
    public string $dataset;
    public string $description;
    public array $diagnostics;
    public string $evidence_status;
    public int $limit;
    public mixed $next_offset;
    public int $offset;
    public array $results;
    public int $returned_rows;
    public string $schema;
    public array $sources;
    public string $status_semantics;
    public int $total_rows;
    public string $transport_status;
}

/** Request payload for Source#list. */
class SourceListMatch
{
    public ?string $absence_policy = null;
    public ?string $carrier_verification = null;
    public ?string $dataset = null;
    public ?string $description = null;
    public ?array $diagnostics = null;
    public ?string $evidence_status = null;
    public ?int $limit = null;
    public mixed $next_offset = null;
    public ?int $offset = null;
    public ?array $results = null;
    public ?int $returned_rows = null;
    public ?string $schema = null;
    public ?array $sources = null;
    public ?string $status_semantics = null;
    public ?int $total_rows = null;
    public ?string $transport_status = null;
}

/** Start entity data model. */
class Start
{
}

/** Request payload for Start#load. */
class StartLoadMatch
{
}

/** Workflow entity data model. */
class Workflow
{
}

/** Request payload for Workflow#load. */
class WorkflowLoadMatch
{
    public string $selection;
    public string $workflow;
}

