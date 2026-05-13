import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ArcutisCopilotWebPartStrings';
import arcutisIconUrl from './assets/arcutis-icon.png';

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

  private _widgetInitialized: boolean = false;

  public render(): void {
    // Widget renders its own floating UI on document.body; web part host stays minimal.
    this.domElement.innerHTML = '<div class="arcutisCopilotHost" aria-hidden="true"></div>';
  }

  protected onInit(): Promise<void> {
    if (!this._widgetInitialized && !window.CopilotBubbleLoaded) {
      window.CopilotBubbleConfig = {
        websocketUrl: 'wss://arcutis-ai-v1-dkgmb6awhxgze5bw.centralus-01.azurewebsites.net/ws',
        botIconUrl: arcutisIconUrl,
        position: 'bottom-right',
        primaryColor: '#a67c52',
        theme: 'light',
        bubbleText: 'AI',
      };

      // Bundled with the web part so SharePoint CSP allows execution (no inline/external script tags).
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('./scripts/copilot-widget.js');
      this._widgetInitialized = true;
    }

    return super.onInit();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
