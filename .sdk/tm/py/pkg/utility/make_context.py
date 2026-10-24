# FinancialEvidence SDK utility: make_context

from projectname_sdk.core.context import FinancialEvidenceContext


def make_context_util(ctxmap, basectx):
    return FinancialEvidenceContext(ctxmap, basectx)
