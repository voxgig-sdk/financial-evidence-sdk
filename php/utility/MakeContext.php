<?php
declare(strict_types=1);

// FinancialEvidence SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class FinancialEvidenceMakeContext
{
    public static function call(array $ctxmap, ?FinancialEvidenceContext $basectx): FinancialEvidenceContext
    {
        return new FinancialEvidenceContext($ctxmap, $basectx);
    }
}
