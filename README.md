# Kevin Lin LLC

Custom React + Vite website for kevinlinllc.com. Project-led design using Geist and IBM Plex Mono, restrained green neutrals, responsive layouts, and system-aware light/dark appearance. Revised using Hallmark's design guidance.

## Develop

```sh
npm ci
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## Edit

- `src/main.jsx`: content, services, navigation, and email form.
- `src/styles.css`: design tokens and responsive styles.
- `public/images/`: artwork retained from the earlier draft; no longer displayed or preloaded by the website.
- `public/CNAME`: custom domain.

Services and first-person introduction are draft positioning for review. Service examples are illustrative possibilities, not past client work. No testimonials, clients, performance metrics, or credentials have been invented.

The featured project is Suffice. Its overview is based on the protocol constitution. The overview distinguishes architectural requirements from implemented capabilities and explicitly notes that the constitution does not define an interoperable implementation. No public repository or demo URL has been supplied, so its action opens an overview and offers an email discussion. Add further projects only from confirmed project descriptions and links.

The contact form uses `mailto:` to prepare a draft addressed to kevin@kevinlinllc.com. It does not deliver email itself or store submissions. Visitors review and send in their email application. A direct email link is provided as a fallback. For in-page delivery, connect a form provider or backend.

## Publish to GitHub Pages

1. Create a GitHub repository and push these files to its `main` branch.
2. In repository Settings > Pages, select GitHub Actions as the publishing source.
3. The included workflow builds and deploys `dist` after a push to `main`.
4. In Pages settings, set the custom domain to `kevinlinllc.com`.
5. At your DNS provider, point four `A` records at host `@` to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`.
6. Set `www` as a CNAME to `stable-release.github.io`. Preserve email DNS records.
7. Once DNS and certificate provisioning finish, enable Enforce HTTPS.

The Vite base is `/`, suitable for this custom domain. A temporary project URL at `username.github.io/repository/` requires a matching base and asset path changes; use the custom domain or an account-level Pages repository for this configuration.

Documentation: https://vite.dev/guide/static-deploy and https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

