# Jackye Clayton Portfolio Wireframes

These wireframes outline the page flow and section layout for the React + Tailwind CSS portfolio site. The design follows a minimalist, left-aligned style inspired by kraa.io, using full-height sections and vibrant gradient accents.

## Overall Page Flow

```
[Hero]
   ↓
[Work]
   ↓
[Ideas]
   ↓
[Story]
   ↓
[Connect]
```

Navigation appears as a slim, left-aligned menu that highlights the active section while scrolling.

## Hero Section

```
┌──────────────────────────────────────────────────────────────────┐
│ Jackye Clayton                                                   │
│ [Tagline or brief intro]                                         │
│                                                                  │
│                                                ↓ scroll indicator│
└──────────────────────────────────────────────────────────────────┘
```
* Full viewport height with black background and white text.
* Left-aligned heading and tagline.
* Subtle scroll indicator at the bottom left.

## Work

```
┌──────────────────────────────────────────────────────────────────┐
│ Work                                                             │
│                                                                  │
│ [ Project Card Grid ]                                            │
│  ◼︎ ◼︎ ◼︎   ◼︎ ◼︎ ◼︎ (desktop 3-column grid)                        │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```
* Gradient accent: **pink → purple**.
* Showcases portfolio projects using the existing card grid system.
* Cards use hover effects and gradient borders.
* On mobile, grid collapses to a single column.

## Ideas

```
┌──────────────────────────────────────────────────────────────────┐
│ Ideas                                                            │
│                                                                  │
│ [ Text blocks / diagrams / concepts ]                            │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```
* Gradient accent: **blue → teal**.
* A place to share creative thoughts, process notes, or concept sketches.
* Maintain left alignment for headings and body text.

## Story

```
┌──────────────────────────────────────────────────────────────────┐
│ Story                                                            │
│                                                                  │
│ [ About Jackye / timeline / mission ]                            │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```
* Gradient accent: **yellow → orange**.
* Contains the about section and personal journey content.

## Connect

```
┌──────────────────────────────────────────────────────────────────┐
│ Connect                                                          │
│                                                                  │
│ [ Contact form ]        [Social Links]                           │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```
* Gradient accent: **green → emerald**.
* Provides contact information, social media links, and a simple form.

### Responsive Notes

- Sections remain full-height on all devices; content stacks vertically on smaller screens.
- Text and navigation stay left-aligned for consistency.
- Gradients can be applied as top borders, background overlays, or underlines to maintain a clean look without overpowering the dark theme.


