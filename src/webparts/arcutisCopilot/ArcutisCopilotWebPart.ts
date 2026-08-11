import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ArcutisCopilotWebPartStrings';
import arcutisIconUrl from './assets/arcutis-icon.png';
import arcutisLogoUrl from './assets/Arcutis.png';

/** Entra Application ID URI for the AIVY API app registration */
const AIVY_API_RESOURCE = 'api://36ed8c97-5488-4ab0-bc39-b8668865d250';

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
  /** Returns Entra access token for AIVY (via SharePoint AadTokenProvider) */
  getAccessToken?: () => Promise<string>;
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
    return super.onInit().then(() => {
      if (this._widgetInitialized || window.CopilotBubbleLoaded) {
        return;
      }

      const user = this.context.pageContext.user;

      return this.context.aadTokenProviderFactory.getTokenProvider().then((tokenProvider) => {
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
          getAccessToken: () => tokenProvider.getToken(AIVY_API_RESOURCE),
        };

        // Bundled with the web part so SharePoint CSP allows execution (no inline/external script tags).
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('./scripts/copilot-widget.js');
        this._widgetInitialized = true;
      });
    });
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
