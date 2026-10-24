<?php
declare(strict_types=1);

// FinancialEvidence SDK utility: result_headers

class FinancialEvidenceResultHeaders
{
    public static function call(FinancialEvidenceContext $ctx): ?FinancialEvidenceResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
