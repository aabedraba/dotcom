# aabedraba.com

Built with NextJs

### Usage

Start the project:

```
npm install
npm run dev
```

This will watch the project directory and restart as necessary.

## Resume

The resume is built with LaTeX using XeLaTeX and the Poppins font.

### Prerequisites

1. Install TinyTeX (minimal LaTeX distribution):
   ```bash
   # macOS
   brew install --cask tinytex
   ```

2. Install required LaTeX packages:
   ```bash
   tlmgr install enumitem titlesec
   ```

3. Install Poppins font:
   ```bash
   brew install --cask font-poppins
   ```

### Building the Resume

Compile with XeLaTeX (required for custom fonts):

```bash
xelatex resume.tex
```

Or use VS Code with the LaTeX Workshop extension - it's configured to use XeLaTeX automatically via `.vscode/settings.json`.

### Why XeLaTeX?

The resume uses the `fontspec` package to load the Poppins font, which requires XeLaTeX or LuaLaTeX (not pdfLaTeX). XeLaTeX allows using system fonts directly.

