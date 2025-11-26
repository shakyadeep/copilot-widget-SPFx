import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './ArcutisCopilotWebPart.module.scss';
import * as strings from 'ArcutisCopilotWebPartStrings';

export interface IArcutisCopilotWebPartProps {
  description: string;
}

export default class ArcutisCopilotWebPart extends BaseClientSideWebPart<IArcutisCopilotWebPartProps> {

 public render(): void {
  this.domElement.innerHTML = `
    <div id="chatbot-container"></div>
  `;

  const scriptId = "custom-chatbot-script";
  if (!document.getElementById(scriptId)) {
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://copilot-test-theta.vercel.app/copilot-bubble.js"; // 🔥 your script URL
    script.async = true;
    document.body.appendChild(script);
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
