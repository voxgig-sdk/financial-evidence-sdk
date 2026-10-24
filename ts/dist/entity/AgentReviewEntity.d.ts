import { FinancialEvidenceEntityBase } from '../FinancialEvidenceEntityBase';
import type { FinancialEvidenceSDK } from '../FinancialEvidenceSDK';
import type { Control } from '../types';
import type { AgentReview, AgentReviewLoadMatch } from '../FinancialEvidenceTypes';
declare class AgentReviewEntity extends FinancialEvidenceEntityBase<AgentReview> {
    constructor(client: FinancialEvidenceSDK, entopts: any);
    make(this: AgentReviewEntity): AgentReviewEntity;
    load(this: any, reqmatch?: AgentReviewLoadMatch, ctrl?: Control): Promise<AgentReviewEntity>;
}
export { AgentReviewEntity };
