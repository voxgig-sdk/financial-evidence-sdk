<?php
declare(strict_types=1);

// FinancialEvidence SDK exists test

require_once __DIR__ . '/../financialevidence_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = FinancialEvidenceSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
