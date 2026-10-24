import { FinancialEvidenceEntityBase } from '../FinancialEvidenceEntityBase';
import type { FinancialEvidenceSDK } from '../FinancialEvidenceSDK';
import type { Control } from '../types';
import type { Start, StartLoadMatch } from '../FinancialEvidenceTypes';
declare class StartEntity extends FinancialEvidenceEntityBase<Start> {
    constructor(client: FinancialEvidenceSDK, entopts: any);
    make(this: StartEntity): StartEntity;
    load(this: any, reqmatch?: StartLoadMatch, ctrl?: Control): Promise<StartEntity>;
}
export { StartEntity };
