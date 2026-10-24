import { FinancialEvidenceEntityBase } from '../FinancialEvidenceEntityBase';
import type { FinancialEvidenceSDK } from '../FinancialEvidenceSDK';
import type { Control } from '../types';
import type { AgentQuery, AgentQueryLoadMatch } from '../FinancialEvidenceTypes';
declare class AgentQueryEntity extends FinancialEvidenceEntityBase<AgentQuery> {
    constructor(client: FinancialEvidenceSDK, entopts: any);
    make(this: AgentQueryEntity): AgentQueryEntity;
    load(this: any, reqmatch?: AgentQueryLoadMatch, ctrl?: Control): Promise<AgentQueryEntity>;
}
export { AgentQueryEntity };
