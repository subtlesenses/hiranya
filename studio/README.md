# Hiranya editor

## Activation

1. Create or select a Sanity project with a public `production` dataset for public
   website content. Invite only authorized editors. Sanity handles sign-in.
2. Copy this folder's `.env.example` to `.env` and set the project ID.
3. Run `npm install`, then `npm run dev` here. Sign in as a project member.
4. From the repository root, set `SANITY_PROJECT_ID`, `SANITY_DATASET`, and a
   temporary `SANITY_WRITE_TOKEN` with Editor permission in the shell. Run
   `npm run seed:sanity -- --rooms-only` to import the eight current rooms.
   Existing documents and drafts are preserved. Never commit the write token.
5. Complete house settings and other content before switching the website to
   Sanity. The full seed needs all referenced files; `public/photos/12.jpg` is
   missing and must be supplied or its references corrected first. Without
   published house settings, the website retains its existing seed content.
6. Run `npm run deploy` here and choose the Studio hostname when prompted.
7. In the existing Vercel website project, set `SANITY_PROJECT_ID` and
   `SANITY_DATASET`. Validate a preview deployment before activating production.
8. Create a Vercel deploy hook for main, then a Sanity POST webhook for published
   content creates, updates and deletes, excluding draft/version documents.
   Enable only once content is ready. Keep the hook URL private and out of the
   Studio client bundle. Do not set any write token on the public website.

## Editing rooms

Open Rooms & photos and choose a room. Room details contains the name,
category, description, beds, capacity and bathroom. Photos lets you upload
images, write alternative text and drag to reorder; the first image is the
cover. Visibility & order controls whether the room is shown and where it sits.
Keep existing room slugs stable so saved links continue to work.

Edits save as drafts. Publish makes them available to the website rebuild; the
site updates after deployment succeeds. Draft website preview is not configured
in this phase. Review fields in Studio and inspect the website after deployment.

Other sections manage house information, floor descriptions, seasonal notes and
quotes. Some homepage copy remains in code; this phase focuses on room galleries.
