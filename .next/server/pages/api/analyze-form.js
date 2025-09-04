"use strict";
(() => {
var exports = {};
exports.id = 311;
exports.ids = [311];
exports.modules = {

/***/ 730:
/***/ ((module) => {

module.exports = require("next/dist/server/api-utils/node.js");

/***/ }),

/***/ 3076:
/***/ ((module) => {

module.exports = require("next/dist/server/future/route-modules/route-module.js");

/***/ }),

/***/ 6705:
/***/ ((module) => {

module.exports = import("formidable");;

/***/ }),

/***/ 626:
/***/ ((module) => {

module.exports = import("js-yaml");;

/***/ }),

/***/ 2079:
/***/ ((module) => {

module.exports = import("openai");;

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 4133:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   config: () => (/* binding */ config),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   routeModule: () => (/* binding */ routeModule)
/* harmony export */ });
/* harmony import */ var next_dist_server_future_route_modules_pages_api_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6429);
/* harmony import */ var next_dist_server_future_route_modules_pages_api_module__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_pages_api_module__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7153);
/* harmony import */ var next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7305);
/* harmony import */ var private_next_pages_api_analyze_form_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7860);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([private_next_pages_api_analyze_form_ts__WEBPACK_IMPORTED_MODULE_3__]);
private_next_pages_api_analyze_form_ts__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// @ts-ignore this need to be imported from next/dist to be external



const PagesAPIRouteModule = next_dist_server_future_route_modules_pages_api_module__WEBPACK_IMPORTED_MODULE_0__.PagesAPIRouteModule;
// Import the userland code.
// @ts-expect-error - replaced by webpack/turbopack loader

// Re-export the handler (should be the default export).
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .l)(private_next_pages_api_analyze_form_ts__WEBPACK_IMPORTED_MODULE_3__, "default"));
// Re-export config.
const config = (0,next_dist_build_webpack_loaders_next_route_loader_helpers__WEBPACK_IMPORTED_MODULE_2__/* .hoist */ .l)(private_next_pages_api_analyze_form_ts__WEBPACK_IMPORTED_MODULE_3__, "config");
// Create and export the route module that will be consumed.
const routeModule = new PagesAPIRouteModule({
    definition: {
        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__/* .RouteKind */ .x.PAGES_API,
        page: "/api/analyze-form",
        pathname: "/api/analyze-form",
        // The following aren't used in production.
        bundlePath: "",
        filename: ""
    },
    userland: private_next_pages_api_analyze_form_ts__WEBPACK_IMPORTED_MODULE_3__
});

//# sourceMappingURL=pages-api.js.map
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7860:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   config: () => (/* binding */ config),
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var openai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2079);
/* harmony import */ var js_yaml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(626);
/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6705);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_3__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([openai__WEBPACK_IMPORTED_MODULE_0__, js_yaml__WEBPACK_IMPORTED_MODULE_1__, formidable__WEBPACK_IMPORTED_MODULE_2__]);
([openai__WEBPACK_IMPORTED_MODULE_0__, js_yaml__WEBPACK_IMPORTED_MODULE_1__, formidable__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




const openai = new openai__WEBPACK_IMPORTED_MODULE_0__["default"]({
    apiKey: process.env.OPENAI_API_KEY
});
const config = {
    api: {
        bodyParser: false
    }
};
async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }
    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({
            error: "OpenAI API key not configured. Please set OPENAI_API_KEY in .env.local"
        });
    }
    try {
        const form = (0,formidable__WEBPACK_IMPORTED_MODULE_2__["default"])();
        const [fields, files] = await form.parse(req);
        const image = Array.isArray(files.image) ? files.image[0] : files.image;
        if (!image) {
            return res.status(400).json({
                error: "No image provided"
            });
        }
        const imageBuffer = fs__WEBPACK_IMPORTED_MODULE_3___default().readFileSync(image.filepath);
        const base64Image = imageBuffer.toString("base64");
        let mimeType = image.mimetype || "image/png";
        if (!mimeType && image.originalFilename) {
            const ext = image.originalFilename.toLowerCase().split(".").pop();
            switch(ext){
                case "png":
                    mimeType = "image/png";
                    break;
                case "jpg":
                case "jpeg":
                    mimeType = "image/jpeg";
                    break;
                case "gif":
                    mimeType = "image/gif";
                    break;
                case "webp":
                    mimeType = "image/webp";
                    break;
                default:
                    mimeType = "image/png";
            }
        }
        const allowedTypes = [
            "image/png",
            "image/jpeg",
            "image/gif",
            "image/webp"
        ];
        if (!allowedTypes.includes(mimeType)) {
            return res.status(400).json({
                error: `Unsupported image format. Use PNG, JPEG, GIF, or WebP.`
            });
        }
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `Analyze this form image and extract all form fields. Return ONLY valid JSON:
              {
                "title": "form title",
                "fields": [
                  {
                    "label": "Field Name",
                    "type": "text",
                    "required": true
                  }
                ]
              }`
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: `data:${mimeType};base64,${base64Image}`
                            }
                        }
                    ]
                }
            ],
            max_tokens: 1500
        });
        const content = response.choices[0]?.message?.content?.trim();
        if (!content) {
            throw new Error("No response from OpenAI");
        }
        let cleanContent = content;
        if (cleanContent.startsWith("```json")) {
            cleanContent = cleanContent.replace(/^```json\s*/, "").replace(/\s*```$/, "");
        } else if (cleanContent.startsWith("```")) {
            cleanContent = cleanContent.replace(/^```\s*/, "").replace(/\s*```$/, "");
        }
        const extractedData = JSON.parse(cleanContent);
        if (!extractedData.fields || !Array.isArray(extractedData.fields)) {
            throw new Error("Invalid response format");
        }
        const formFields = extractedData.fields.map((field, index)=>({
                id: field.label?.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "") || `field_${index}`,
                text: field.label || `Field ${index}`,
                type: field.type || "text",
                required: field.required || false,
                options: field.options || []
            }));
        const yamlStructure = {
            questionnaire: {
                id: "uploaded_form",
                text: extractedData.title || "Form",
                type: "group",
                questions: formFields.map((field)=>({
                        id: field.id,
                        text: field.text,
                        type: field.type,
                        required: field.required,
                        ...field.options && field.options.length > 0 && {
                            options: field.options
                        }
                    }))
            }
        };
        const yamlString = js_yaml__WEBPACK_IMPORTED_MODULE_1__["default"].dump(yamlStructure, {
            indent: 2
        });
        res.status(200).json({
            yaml: yamlString,
            extractedFields: formFields
        });
    } catch (error) {
        console.error("Analysis error:", error);
        res.status(500).json({
            error: "Failed to analyze form image"
        });
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [172], () => (__webpack_exec__(4133)));
module.exports = __webpack_exports__;

})();