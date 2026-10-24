# Security compatibility pins

Reviewed 24 October 2026. Keep the website and editor lockfiles committed.

- The website pins `@astrojs/vercel` 11.0.8 with its supported `@vercel/functions` 3.6.1 dependency. This adapter supports Astro 7 and supplies the site's Fetch runtime, CSP and cache-provider APIs. Later adapter versions introduce `@vercel/cli-config` 0.3.3, which bundles affected Zod 4.1.11 code. Replacing only its declared Zod dependency does not remove that bundle. Remove these temporary pins only after verifying an upstream release removes or patches the bundled code and the production flow still passes. The site uses neither ISR nor rewrite middleware affected by later adapter changes.
- Keep `path-to-regexp` 6.3.0 scoped to Vercel Routing Utils until its upstream pin is patched.
- The repository editor scopes Undici 7.30.1 to Module Federation's old exact pin; compatible copies use the same patched 7.x release. Keep its existing Vercel Frameworks YAML/TOML parser overrides until their upstream pins are patched.
- The remaining UUID advisory belongs to the editor CLI's typeid-js dependency. The inspected caller uses v7/stringify, outside the cited affected APIs. Do not force a different UUID major or downgrade Sanity just to clear that propagated warning; recheck a supported upstream fix.

Validation: website security tests, dependency audit, both production builds, and production page/header/enquiry/gallery checks. Production changes require the `Website security and build` GitHub Actions check.

References: [adapter changelog](https://raw.githubusercontent.com/withastro/astro/main/packages/integrations/vercel/CHANGELOG.md), [Zod advisory](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5), [UUID advisory](https://github.com/advisories/GHSA-w5hq-g745-h8pq).
