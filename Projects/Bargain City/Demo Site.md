We are building a shoppable circular demo that transforms Bargain City’s traditional, non-clickable PDF circulars into an interactive shopping experience.

The system includes an internal admin mapping tool that lets staff upload a circular and draw clickable hotspots over each product. These hotspots are linked to product data in the backend.

Shoppers then use a public-facing interface to browse the circular and click any mapped item to view its details—similar to the interactive weekly ads used by major grocery chains.

The result is a modern, fully interactive version of Bargain City’s circulars designed to show what their digital shopper experience could look like.

Here are the **key user-experience features** that are evident from how ShopRite presents its interactive circulars — and which you’ll want to include (or improve upon) in your demo for the client. I’ll then map how each one translates into actionable requirements for your “shoppable circular” project.

---

## ✅ Key UX features from the ShopRite model

![Image](https://d16fzx5hhs0dp6.cloudfront.net/thumbnail/2025-11/client-4573/catalogue-12962667/11_7_z8r13_ns117_000001-resized.jpeg)

![Image](https://storage.googleapis.com/download/storage/v1/b/dam-prs-prd-c7e7986.prs.prd.v8.commerce.mi9cloud.com/o/SR%20Images%2FWeekly_Circular_600x500.png?alt=media)

1. **Clickable items in the ad/circular**
   On ShopRite’s site you can browse the weekly ad and “click on any product to add it to your list or cart…” ([ShopRite][1])

   * This means hotspots over individual product images or listings in the PDF/ad.
   * Clicking brings up details, or allows an action (add to cart / wishlist / list) instantly.
   * The demo should support hotspots on the circular that behave similarly (tap/click → product details).

2. **Zoom-/pan-friendly PDF/ad view**
   Since the circular is a large layout (many products), users expect to zoom in/out, pan across pages.

   * On mobile, you’ll need pinch/zoom or double-tap to enlarge regions.
   * On desktop, maybe click to enlarge or hover details.
     This is implied by large ad layouts and hotspot interaction. ShopRite’s underlying PDF-based ad is large enough that this usability is important. ([Living Rich With Coupons®][2])

3. **Digital coupons integration**
   ShopRite couples the ad with digital coupon functionality: “and even load available digital coupons to your Price Plus club card” (from the circular page). ([ShopRite][1])

   * Users should be able to click an item in the circular, see if there’s a coupon, and *load* it (or link) to their account.
   * In your demo, perhaps show a “Coupon available” badge in the hotspot details, or a link to “Apply coupon” if it exists.

4. **Product detail pop-up or modal**
   When you click an item, you expect a detail view: image(s), description, sale price, original price, savings, maybe related items.

   * In your screenshot sample you had that for “USDA Choice Beef Top Round London Broil… On Sale! $10.48…” So similar.
   * UX must feel seamless: from hotspot → detail view without full page reload.

5. **Consistent navigation & filtering of circulars**

   * The ShopRite site allows you to view different weeks of ads (e.g., “Week of 11/09” and “Week of 11/16”) so users can navigate between ad issues.
     ([ShopRite][1])
   * In your demo you want a way to switch ad‐editions (dates/weeks), maybe via a drop-down or list of past circulars.

6. **Responsive/mobile friendly experience**

   * The circular must work on mobile (touch) and desktop (mouse).
   * The hotspot regions must be large enough on mobile to tap easily.
   * Zoom & pan features must be smooth on smaller screens.

7. **Visual cues & affordances for interactivity**

   * Clearly show which parts of the circular are interactive (hotspots). Maybe on hover/tap highlight border or change cursor.
   * Use consistent styling (e.g., product image + overlay icon or “click to learn more”).
   * Provide feedback when action is taken (e.g., item added to list/cart, coupon loaded).

8. **Performance & load time**

   * Large ad PDFs and images can be heavy. UX will suffer if page loads slowly, zoom/scroll laggy.
   * Implementation should optimize imagery (compress, lazy‐load), prefetch hotspots metadata.
   * On mobile especially important.

9. **Accessibility considerations**

   * Ensure hotspots are accessible (keyboard navigation, screen‐reader labeling).
   * Ensure contrast, zoom functionality supports users with poor vision.
   * Ensure touch targets are large enough.

10. **Integration with product data / state management**

    * Behind the scenes, clicking a hotspot should connect to your product catalog (price, stock status, images).
    * Provide real-time or at least up-to-date information (sale dates, cushion for expired promotions).
    * As in the example screenshot: “Sales price valid from 11/09/2025 until 11/15/2025” — you’ll need metadata for each product’s valid date range.

---

## 🛠 How this maps to demo requirements

| Feature                            | Requirement in your system                                                                                                                                                           |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Hotspot creation (admin)           | Admin‐mapper must support drawing rectangular hotspots over PDF pages, linking each to a product ID.                                                                                 |
| Hotspot interactive view (shopper) | In public interface: when viewing the PDF, hotspots must be overlaid and clickable/tappable.                                                                                         |
| Detail modal/pop-up                | Clicking a hotspot opens a modal or side panel showing product image, name, sale price, original price, savings, coupon badge if applicable, sale validity dates.                    |
| PDF viewer with pan/zoom           | Embed a PDF viewer (or equivalent) that supports zooming in/out, panning, page navigation.                                                                                           |
| Edition selection                  | UI must allow selecting different weekly circular editions (by week date) and navigate pages within each edition.                                                                    |
| Digital coupon support             | In the detail view, show coupon availability and provide a “Load coupon” or “Save for later” button (or simulated in demo).                                                          |
| Responsive design                  | Frontend must adapt to mobile & desktop. Hotspots remain usable on both.                                                                                                             |
| Visual cues for interactivity      | Hotspots should be visually indicated (hover highlight, tap feedback). Possibly show a subtle overlay icon or bounding box.                                                          |
| Performance optimization           | Pre‐load essential assets, lazy‐load other pages, ensure smooth zoom/scroll.                                                                                                         |
| Accessibility                      | Hotspots should be keyboard‐focusable; text alternatives for screen-readers; ensure zoom/pan works with assistive tech.                                                              |
| Metadata & timing                  | Each product mapping should include metadata: product ID, sale start date, sale end date, regular price, sale price, coupon info, link to product page. Admin must input/edit these. |
| Analytics capability (future)      | Track which hotspots/users click, conversion to cart/list, so you can show value to Bargain City.                                                                                    |

