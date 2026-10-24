# Typed models for the FinancialEvidence SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class AgentQuery(TypedDict):
    pass


class AgentQueryLoadMatchRequired(TypedDict):
    dataset: str


class AgentQueryLoadMatch(AgentQueryLoadMatchRequired, total=False):
    end_date: str
    entity: str
    limit: int
    offset: int
    previous_revision: str
    start_date: str


class AgentReview(TypedDict):
    pass


class AgentReviewLoadMatch(TypedDict, total=False):
    bank: str
    limit: int
    previous_revision: str


class Dataset(TypedDict):
    pass


class DatasetListMatch(TypedDict):
    pass


class FundingReview(TypedDict):
    pass


class FundingReviewLoadMatch(TypedDict):
    pass


class Query(TypedDict):
    absence_policy: str
    carrier_verification: str
    dataset: str
    description: str
    diagnostics: list
    evidence_status: str
    limit: int
    next_offset: Any
    offset: int
    results: list
    returned_rows: int
    schema: str
    sources: list
    status_semantics: str
    total_rows: int
    transport_status: str


class QueryListMatchRequired(TypedDict):
    dataset: str


class QueryListMatch(QueryListMatchRequired, total=False):
    end_date: str
    entity: str
    limit: int
    offset: int
    start_date: str


class Release(TypedDict):
    pass


class ReleaseLoadMatch(TypedDict):
    pass


class Source(TypedDict):
    absence_policy: str
    carrier_verification: str
    dataset: str
    description: str
    diagnostics: list
    evidence_status: str
    limit: int
    next_offset: Any
    offset: int
    results: list
    returned_rows: int
    schema: str
    sources: list
    status_semantics: str
    total_rows: int
    transport_status: str


class SourceListMatch(TypedDict, total=False):
    absence_policy: str
    carrier_verification: str
    dataset: str
    description: str
    diagnostics: list
    evidence_status: str
    limit: int
    next_offset: Any
    offset: int
    results: list
    returned_rows: int
    schema: str
    sources: list
    status_semantics: str
    total_rows: int
    transport_status: str


class Start(TypedDict):
    pass


class StartLoadMatch(TypedDict):
    pass


class Workflow(TypedDict):
    pass


class WorkflowLoadMatch(TypedDict):
    selection: str
    workflow: str
