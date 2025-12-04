<!-- 31af9123-70a1-4ac0-bcba-a225b76f7134 3465612b-602a-4740-86e5-10fa5a51d29b -->
# Equalize Project Card Heights

Make all project cards the same height by ensuring they all match the tallest card's height.

## Implementation

Update [components/Projects/Projects.module.css](components/Projects/Projects.module.css) using **Option A (CSS-only approach)**: Set a `min-height` on `.projectCard` that accommodates the tallest card content.

We'll calculate a `min-height` that accounts for:

- Image container: 200px (fixed)
- Title: ~1.75rem font size + margins
- Description: ~1.75rem font size + margins (longest text: "SCSS / MERN Full Stack" or "TypeScript / PLpgSQL / CSS")
- Button container: buttons + margins
- Padding: 1.5rem top and bottom

## Changes

1. **Update `.projectCard` in Projects.module.css**: Add `min-height` property (approximately 500-550px) to ensure all cards have the same minimum height, matching the tallest card's natural height.