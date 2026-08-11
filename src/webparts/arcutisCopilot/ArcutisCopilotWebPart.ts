import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ArcutisCopilotWebPartStrings';
import arcutisIconUrl from './assets/arcutis-icon.png';
import arcutisLogoUrl from './assets/Arcutis.png';

export interface IArcutisCopilotWebPartProps {
  description: string;
}

interface ICopilotBubbleConfig {
  sseUrl: string;
  botIconUrl?: string;
  logoUrl?: string;
  position?: string;
  primaryColor?: string;
  theme?: string;
  bubbleText?: string;
  displayName?: string;
  email?: string;
  loginName?: string;
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
      const user = this.context.pageContext.user;

      window.CopilotBubbleConfig = {
        sseUrl: 'https://arcnet-ai-buddy-api.azurewebsites.net/chat',
        botIconUrl: arcutisIconUrl,
        logoUrl: arcutisLogoUrl,
        position: 'bottom-right',
        primaryColor: '#a67c52',
        theme: 'light',
        bubbleText: 'AI',
        displayName: user.displayName,
        email: user.email,
        loginName: user.loginName,
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
