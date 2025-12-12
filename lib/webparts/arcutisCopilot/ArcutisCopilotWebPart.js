var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Version } from '@microsoft/sp-core-library';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'ArcutisCopilotWebPartStrings';
import arcutisIconUrl from './assets/arcutis-icon.png';
var ArcutisCopilotWebPart = /** @class */ (function (_super) {
    __extends(ArcutisCopilotWebPart, _super);
    function ArcutisCopilotWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArcutisCopilotWebPart.prototype.render = function () {
        this.domElement.innerHTML = "\n    <div id=\"chatbot-container\"></div>\n  ";
        var configScriptId = "copilot-config-script";
        var widgetScriptId = "copilot-widget-script";
        // Add configuration script if not already present
        if (!document.getElementById(configScriptId)) {
            var configScript = document.createElement("script");
            configScript.id = configScriptId;
            configScript.textContent = "\n      window.CopilotBubbleConfig = {\n        // WebSocket URL - REQUIRED\n        websocketUrl: 'wss://arcutis-ai-v1-dkgmb6awhxgze5bw.centralus-01.azurewebsites.net/ws',\n        botIconUrl: '".concat(arcutisIconUrl, "',\n        // Optional configuration\n        position: 'bottom-right', // 'bottom-right', 'bottom-left', 'top-right', 'top-left'\n        primaryColor: '#a67c52', // Vintage paper primary color\n        theme: 'light', // 'light' or 'dark'\n        bubbleText: 'AI',\n      };\n    ");
            document.body.appendChild(configScript);
        }
        // Add widget script if not already present
        if (!document.getElementById(widgetScriptId)) {
            var widgetScript = document.createElement("script");
            widgetScript.id = widgetScriptId;
            widgetScript.src = "https://copilot-test-theta.vercel.app/copilot-bubble.js";
            widgetScript.async = true;
            document.body.appendChild(widgetScript);
        }
    };
    Object.defineProperty(ArcutisCopilotWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    ArcutisCopilotWebPart.prototype.getPropertyPaneConfiguration = function () {
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
    };
    return ArcutisCopilotWebPart;
}(BaseClientSideWebPart));
export default ArcutisCopilotWebPart;
//# sourceMappingURL=ArcutisCopilotWebPart.js.map