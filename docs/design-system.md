# ConversaAI - Design System

## Visual References
- Figma File: [Prototype Link](https://www.figma.com/proto/UhAqS1enX75KPsTPrvD0n9/ConversaAI---UI?node-id=0-1&t=HcY78M2yJ7dLVUiQ-1)
- Design Inspiration: Clean, accessible

## Color Palette

### Light Mode
| Purpose | Hex | Usage |
|---------|--------|-----|
| Background | #FFFFFF | Background |
| Text | #212529 | Text |
| Text Placeholder | #ADB5BD | Placeholder text |
| Border Default | #DEE2E6 | Buttons, User/ AI Message borders |
| Accent | #1F7A8C | Buttons, links |

### Dark Mode
| Purpose | Hex | Usage |
|---------|--------|-----|
| Background Primary | #212529 | Background |
| Text | #FFFFFF | Text |
| Text Placeholder | #ADB5BD | Placeholder text |
| Border Default | #343A40 | Buttons, User/ AI Message borders |
| Accent | #1F7A8C | Buttons, links |

### Font Stack
- Primary: Inter (Google Fonts)
- Logo: Syne (Google Fonts)
- Icons: Font awesome icons
- Fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

## Component Specifications
### Logo
- Font: 24px, Bold

### Message Bubble
- Padding: 12px 16px
- Border Radius: 16px
- Border color: Border Default
- Font: 16px, medium weight

### Input Field
- Border Radius: 16px
- Padding: 12px
- Border color: Border Default

### Theme Switch Button
- Border Radius: 100%
- Padding: 8px
- Font: Moon and Sun icon, medium weight
- Primary: 
    - Light Mode: White background, black text
    - Dark Mode: Black background, white text
- Hover: 
    - Light Mode: Black background, white text
    - Dark Mode: White background, black text

### Send Button
- Border Radius: 100%
- Padding: 8px
- Font: Up arrow icon, medium weight
- Primary: Accent background, white text
- Secondary: White background, black text, light border

# Implementation Notes
- Mobile-first responsive approach
