# arcutis-co

## Summary

Arcutis Copilot is a SharePoint Framework (SPFx) web part that integrates a custom chatbot interface into SharePoint pages. The web part loads an external chatbot script to provide an interactive copilot experience for users.

**Technologies Used:**

- SharePoint Framework (SPFx) 1.18.2
- TypeScript
- React
- Gulp
- SCSS

## Used SharePoint Framework Version-

![version](https://img.shields.io/badge/version-1.18.2-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

> **⚠️ Important:** The latest SharePoint Framework (SPFx) 1.18.2 **requires Node.js 18.x**. Using the correct Node.js version is critical for the project to work properly.

### Required Software and Versions

| Software                 | Version        | Notes                                                                     |
| ------------------------ | -------------- | ------------------------------------------------------------------------- |
| **Node.js**              | **18.x (LTS)** | **Required:** SPFx 1.18.2 requires Node.js 18. Use nvm to manage versions |
| **npm**                  | 8.x or higher  | Comes bundled with Node.js                                                |
| **Gulp CLI**             | Latest         | Install globally: `npm install -g gulp-cli`                               |
| **Yeoman**               | Latest         | Install globally: `npm install -g yo`                                     |
| **SharePoint Generator** | Latest         | Install globally: `npm install -g @microsoft/generator-sharepoint`        |
| **Git**                  | Latest         | For cloning the repository                                                |
| **Code Editor**          | -              | Visual Studio Code recommended                                            |

### Installation Steps for Prerequisites

> **💡 Recommended:** Use [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager) to easily switch between Node.js versions. This project includes a `.nvmrc` file that automatically specifies Node.js 18.

1. **Install and Configure Node.js 18.x using nvm (Recommended)**

   ```bash
   # Install nvm (if not already installed)
   # macOS/Linux: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   # Windows: Download from https://github.com/coreybutler/nvm-windows/releases

   # Install Node.js 18
   nvm install 18

   # Use Node.js 18 (this project has .nvmrc file, so you can just run:)
   nvm use
   # Or explicitly:
   nvm use 18

   # Set Node.js 18 as default (optional)
   nvm alias default 18
   ```

   **Alternative:** If you prefer not to use nvm, download Node.js 18.x LTS directly from [nodejs.org](https://nodejs.org/)

2. **Verify Node.js and npm installation**

   ```bash
   node --version  # Must show v18.x.x
   npm --version   # Should show 8.x.x or higher
   ```

3. **Install global packages**

   ```bash
   npm install -g gulp-cli yo @microsoft/generator-sharepoint
   ```

4. **Verify global installations**
   ```bash
   gulp --version
   yo --version
   ```

## Configuration

### Project Configuration Files

- **`package.json`**: Defines project dependencies and scripts
- **`tsconfig.json`**: TypeScript compiler configuration
- **`gulpfile.js`**: Gulp build tasks configuration
- **`config/serve.json`**: Local development server configuration (port 4321)
- **`config/package-solution.json`**: SharePoint package solution configuration
- **`.nvmrc`**: **Node.js version specification (18)** - Automatically switches to Node.js 18 when using `nvm use`

### Environment Variables

No environment variables are required for local development. The web part uses the default SharePoint Framework workbench.

## Solution

| Solution   | Author(s)                |
| ---------- | ------------------------ |
| arcutis-co | Arcutis Development Team |

## Version history

| Version | Date            | Comments                                    |
| ------- | --------------- | ------------------------------------------- |
| 1.0.0.0 | Initial release | Initial release of Arcutis Copilot web part |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Running Locally

> **⚠️ Before You Start:** Ensure you have Node.js 18.x installed and active. SPFx 1.18.2 requires Node.js 18. We strongly recommend using [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions. This project includes a `.nvmrc` file for automatic version switching.

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd arcutis-co
```

### Step 2: Switch to Node.js 18 (Required)

> **⚠️ Critical:** SPFx 1.18.2 requires Node.js 18. Ensure you're using the correct version before proceeding.

**If using nvm (Recommended):**

```bash
# The project includes .nvmrc file, so simply run:
nvm use

# Or explicitly specify Node.js 18:
nvm use 18
```

**Verify the Node.js version:**

```bash
node --version  # Must show v18.x.x
```

If you're not using nvm, ensure Node.js 18.x is installed and active in your system PATH.

### Step 3: Install Dependencies

Install all project dependencies using npm:

```bash
npm install
```

This will install all required packages listed in `package.json`, including:

- SharePoint Framework core libraries (1.18.2)
- Build tools (Gulp, TypeScript, Webpack)
- Development dependencies (ESLint, TypeScript types)

### Step 4: Build the Project

Build the project to compile TypeScript and generate the necessary files:

```bash
npm run build
```

Or using Gulp directly:

```bash
gulp bundle
```

### Step 5: Serve Locally

Start the local development server:

```bash
npm run serve
```

Or using Gulp directly:

```bash
gulp serve
```

This will:

- Start a local web server on `https://localhost:4321`
- Open the SharePoint Framework workbench in your default browser
- Enable hot-reload for development

### Step 6: Test the Web Part

1. The workbench will open automatically at `https://localhost:4321/temp/workbench.html`
2. Click the **+** button to add a web part
3. Select **Arcutis Copilot** from the web part picker
4. The chatbot interface should load and be ready for interaction

### Available Scripts

| Command         | Description                                         |
| --------------- | --------------------------------------------------- |
| `npm run build` | Compiles TypeScript and bundles the project         |
| `npm run clean` | Cleans the build output directories                 |
| `npm run serve` | Starts the local development server with hot-reload |
| `npm run test`  | Runs the test suite                                 |

## Build and Deployment

### Build for Production

```bash
npm run build
```

This creates optimized production bundles in the `dist` folder.

### Package Solution

To create a SharePoint package (`.sppkg` file) for deployment:

```bash
gulp bundle --ship
gulp package-solution --ship
```

The package will be created at:

```
sharepoint/solution/arcutis-co.sppkg
```

### Deploy to SharePoint

1. Upload the `.sppkg` file to your SharePoint App Catalog
2. Approve the API permissions if required
3. Add the web part to your SharePoint pages

## Features

The Arcutis Copilot web part provides:

- **Custom Chatbot Integration**: Loads an external chatbot script for interactive assistance
- **SharePoint Framework Integration**: Seamlessly integrates with SharePoint pages
- **Responsive Design**: Works across different screen sizes
- **Property Pane Configuration**: Configurable through SharePoint property pane

This extension illustrates the following concepts:

- SharePoint Framework web part development
- External script loading in SPFx
- TypeScript and React integration
- Gulp-based build process

## Troubleshooting

### Common Issues

1. **Node.js version mismatch**

   - **SPFx 1.18.2 requires Node.js 18.x** - This is mandatory
   - If using nvm: Run `nvm use` (the project has `.nvmrc` file for automatic version detection)
   - Verify with: `node --version` (must show v18.x.x)
   - If you see a different version, install nvm and run `nvm install 18 && nvm use 18`

2. **Port 4321 already in use**

   - Change the port in `config/serve.json`
   - Or stop the process using port 4321

3. **Build errors**

   - Run `npm run clean` and then `npm install` again
   - Delete `node_modules` and reinstall if issues persist

4. **Certificate errors in browser**
   - Accept the self-signed certificate when prompted
   - Or install the SPFx development certificate

### Getting Help

- Check the [SharePoint Framework documentation](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview)
- Review [SPFx troubleshooting guide](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/troubleshooting)

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
