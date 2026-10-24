# FinancialEvidence SDK exists test

import pytest
from financialevidence_sdk import FinancialEvidenceSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = FinancialEvidenceSDK.test(None, None)
        assert testsdk is not None
