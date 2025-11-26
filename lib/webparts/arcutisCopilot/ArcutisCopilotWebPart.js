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
var ArcutisCopilotWebPart = /** @class */ (function (_super) {
    __extends(ArcutisCopilotWebPart, _super);
    function ArcutisCopilotWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArcutisCopilotWebPart.prototype.render = function () {
        this.domElement.innerHTML = "\n    <div id=\"chatbot-container\"></div>\n  ";
        var scriptId = "custom-chatbot-script";
        if (!document.getElementById(scriptId)) {
            var script = document.createElement("script");
            script.id = scriptId;
            script.src = "https://copilot-test-theta.vercel.app/copilot-bubble.js"; // 🔥 your script URL
            script.async = true;
            document.body.appendChild(script);
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