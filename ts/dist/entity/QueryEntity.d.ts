import { FinancialEvidenceEntityBase } from '../FinancialEvidenceEntityBase';
import type { FinancialEvidenceSDK } from '../FinancialEvidenceSDK';
import type { Control } from '../types';
import type { Query, QueryListMatch } from '../FinancialEvidenceTypes';
declare class QueryEntity extends FinancialEvidenceEntityBase<Query> {
    constructor(client: FinancialEvidenceSDK, entopts: any);
    make(this: QueryEntity): QueryEntity;
    list(this: any, reqmatch?: QueryListMatch, ctrl?: Control): Promise<QueryEntity[]>;
}
export { QueryEntity };
