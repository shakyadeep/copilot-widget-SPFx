import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
export interface IArcutisCopilotWebPartProps {
    description: string;
}
export default class ArcutisCopilotWebPart extends BaseClientSideWebPart<IArcutisCopilotWebPartProps> {
    render(): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=ArcutisCopilotWebPart.d.ts.map