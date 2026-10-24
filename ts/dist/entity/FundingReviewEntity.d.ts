import { FinancialEvidenceEntityBase } from '../FinancialEvidenceEntityBase';
import type { FinancialEvidenceSDK } from '../FinancialEvidenceSDK';
import type { Control } from '../types';
import type { FundingReview, FundingReviewLoadMatch } from '../FinancialEvidenceTypes';
declare class FundingReviewEntity extends FinancialEvidenceEntityBase<FundingReview> {
    constructor(client: FinancialEvidenceSDK, entopts: any);
    make(this: FundingReviewEntity): FundingReviewEntity;
    load(this: any, reqmatch?: FundingReviewLoadMatch, ctrl?: Control): Promise<FundingReviewEntity>;
}
export { FundingReviewEntity };
