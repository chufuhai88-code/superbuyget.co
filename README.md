# superbuyget.com

Static companion site for SuperBuy spreadsheet-style browse → paste workflows.

- **Canonical host:** [superbuyget.com](https://superbuyget.com)
- **Source repo:** [github.com/chufuhai88-code/superbuyget.co](https://github.com/chufuhai88-code/superbuyget.co)
- **Stack:** HTML, CSS, vanilla JS
- **Local preview:** `run-preview.bat` or `npx serve . -l tcp://127.0.0.1:8767`

## Deploy (GitHub Pages)

Pushes to `main` run [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).

1. Repo **Settings → Pages → Build and deployment**: set **Source** to **GitHub Actions** (first time only, if GitHub prompts you).
2. After the workflow finishes, Pages URL is **`https://chufuhai88-code.github.io/superbuyget.co/`**  
3. Links in HTML use absolute paths `/…` aimed at apex **superbuyget.com**. For best behavior on `.github.io`, add **Pages → Custom domain** `superbuyget.com`, then point DNS (A / CNAME) per [GitHub docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Clone & push

```bash
git clone https://github.com/chufuhai88-code/superbuyget.co.git
cd superbuyget.co
```
