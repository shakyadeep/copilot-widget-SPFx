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
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._widgetInitialized = false;
        return _this;
    }
    ArcutisCopilotWebPart.prototype.render = function () {
        // Widget renders its own floating UI on document.body; web part host stays minimal.
        this.domElement.innerHTML = '<div class="arcutisCopilotHost" aria-hidden="true"></div>';
    };
    ArcutisCopilotWebPart.prototype.onInit = function () {
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
        return _super.prototype.onInit.call(this);
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