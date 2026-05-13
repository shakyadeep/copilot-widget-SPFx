import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
export interface IArcutisCopilotWebPartProps {
    description: string;
}
interface ICopilotBubbleConfig {
    websocketUrl: string;
    botIconUrl?: string;
    position?: string;
    primaryColor?: string;
    theme?: string;
    bubbleText?: string;
}
declare global {
    interface Window {
        CopilotBubbleConfig?: ICopilotBubbleConfig;
        CopilotBubbleLoaded?: boolean;
    }
}
export default class ArcutisCopilotWebPart extends BaseClientSideWebPart<IArcutisCopilotWebPartProps> {
    private _widgetInitialized;
    render(): void;
    protected onInit(): Promise<void>;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
export {};
//# sourceMappingURL=ArcutisCopilotWebPart.d.ts.map