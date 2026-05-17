# superbuyget.com

Static companion site for SuperBuy spreadsheet-style browse → paste workflows.

- **Canonical host:** [superbuyget.com](https://superbuyget.com)
- **Source repo:** [github.com/chufuhai88-code/superbuyget.co](https://github.com/chufuhai88-code/superbuyget.co)
- **Stack:** HTML, CSS, vanilla JS
- **Local preview:** `run-preview.bat` or `npx serve . -l tcp://127.0.0.1:8767`

## Deploy (GitHub Pages)

1. Workflow [`.github/workflows/gh-pages.yml`](.github/workflows/gh-pages.yml) runs on pushes to **`main`** and publishes the workspace to **`gh-pages`**.
2. In the repo — **Settings → Pages → Build and deployment**: Source = **Deploy from a branch**, Branch = **`gh-pages`** / **`/ (root)`** (set this **after** the first workflow run succeeds, so `gh-pages` exists).
3. Published URL defaults to **`https://chufuhai88-code.github.io/superbuyget.co/`**  
4. Canonical links assume apex **superbuyget.com**. For correct `/…` URLs in production, add **Custom domain** `superbuyget.com` under Pages + DNS per [GitHub docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Clone & push

```bash
git clone https://github.com/chufuhai88-code/superbuyget.co.git
cd superbuyget.co
```
