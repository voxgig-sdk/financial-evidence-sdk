# FinancialEvidence SDK feature factory

from financialevidence_sdk.feature.base_feature import FinancialEvidenceBaseFeature
from financialevidence_sdk.feature.ratelimit_feature import FinancialEvidenceRatelimitFeature
from financialevidence_sdk.feature.retry_feature import FinancialEvidenceRetryFeature
from financialevidence_sdk.feature.test_feature import FinancialEvidenceTestFeature
from financialevidence_sdk.feature.timeout_feature import FinancialEvidenceTimeoutFeature


_FEATURES = {
    "base": lambda: FinancialEvidenceBaseFeature(),
    "ratelimit": lambda: FinancialEvidenceRatelimitFeature(),
    "retry": lambda: FinancialEvidenceRetryFeature(),
    "test": lambda: FinancialEvidenceTestFeature(),
    "timeout": lambda: FinancialEvidenceTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
