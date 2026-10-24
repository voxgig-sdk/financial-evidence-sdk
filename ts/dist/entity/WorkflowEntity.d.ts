import { FinancialEvidenceEntityBase } from '../FinancialEvidenceEntityBase';
import type { FinancialEvidenceSDK } from '../FinancialEvidenceSDK';
import type { Control } from '../types';
import type { Workflow, WorkflowLoadMatch } from '../FinancialEvidenceTypes';
declare class WorkflowEntity extends FinancialEvidenceEntityBase<Workflow> {
    constructor(client: FinancialEvidenceSDK, entopts: any);
    make(this: WorkflowEntity): WorkflowEntity;
    load(this: any, reqmatch?: WorkflowLoadMatch, ctrl?: Control): Promise<WorkflowEntity>;
}
export { WorkflowEntity };
