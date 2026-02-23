import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './ArcutisCopilotWebPart.module.scss';
import * as strings from 'ArcutisCopilotWebPartStrings';
import arcutisIconUrl from './assets/arcutis-icon.png';

export interface IArcutisCopilotWebPartProps {
  description: string;
}

export default class ArcutisCopilotWebPart extends BaseClientSideWebPart<IArcutisCopilotWebPartProps> {

 public render(): void {
  this.domElement.innerHTML = `
    <div id="chatbot-container"></div>
  `;

  const configScriptId = "copilot-config-script";
  const widgetScriptId = "copilot-widget-script";

  // Add configuration script if not already present
  if (!document.getElementById(configScriptId)) {
    const configScript = document.createElement("script");
    configScript.id = configScriptId;
    configScript.textContent = `
      window.CopilotBubbleConfig = {
        // WebSocket URL - REQUIRED
        websocketUrl: 'wss://arcutis-ai-v1-dkgmb6awhxgze5bw.centralus-01.azurewebsites.net/ws',
        botIconUrl: '${arcutisIconUrl}',
        // Optional configuration
        position: 'bottom-right', // 'bottom-right', 'bottom-left', 'top-right', 'top-left'
        primaryColor: '#a67c52', // Vintage paper primary color
        theme: 'light', // 'light' or 'dark'
        bubbleText: 'AI',
      };
    `;
    document.body.appendChild(configScript);
  }

  // Add widget script if not already present
  if (!document.getElementById(widgetScriptId)) {
    const widgetScript = document.createElement("script");
    widgetScript.id = widgetScriptId;
    widgetScript.src = "https://copilot-test-theta.vercel.app/copilot-bubble.js";
    widgetScript.async = true;
    document.body.appendChild(widgetScript);
  }
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
