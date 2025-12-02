
# Urban Time Traveler
## Tracking the Evolution of Pedestrian Infrastructure

---

**The Idea:** 
A "Time Machine" for urban planners and researchers to visualize how pedestrian infrastructure (sidewalks, crosswalks) has evolved.
<small>

**Scope:**
- **Focus Area:** Central Brooklyn
- **Time Range:** Historical analysis of as many years we can find (1924, 1951, 1996, 2004, 2010, 2012, 2014, 2016)
- **Output:** A fully interactive web dashboard comparing detected infrastructure against official city records.

</small>

---

### Key Questions
<small>

1. **Quantifying Change**: How has the total length and area of pedestrian space changed over the last decade?

2.  **Detection Accuracy:** Can computer vision models (`tile2net`) accurately extract infrastructure from historical aerial imagery compared to official datasets?
3.  **Gap Analysis:** Where are the discrepancies between physical infrastructure (satellite view) and city records?
4.  **Walkability Evolution:** Have specific neighborhoods seen measurable improvements in walkability metrics?

</small>


---

## Data Acquisition Sources

We aggregated data from three primary sources to build our ground truth and inference inputs:

<small>

1.  **NYC Planimetrics:** Official vector data (Shapefiles/GDB) used for validation (Years: 1924, 1951, 1996, 2004, 2010, 2012, 2014, 2016).
2.  **OpenStreetMap (OSM):** Contextual street network data.
3.  **NYCSidewalks:** Additional reference datasets.
4.  **NYC Map Tiles:** Historical aerial imagery tiles (XYZ service).

</small>

---

## Data Acquisition Issues

Obtaining high-resolution historical data was not straightforward.

<small>

*   **Rate Limits:** NYC GIS servers throttled our batch download requests.
*   **Bandwidth:** High-res imagery requires massive bandwidth; local downloading took hours.
*   **File Sizes:** Reference Shapefiles and GDBs were gigabytes in size, crashing local scripts.
*   **Missing Tiles:** The silent killer of our inference pipeline.

</small>

---

## The "Antipattern"

<grid >
![[Screenshot 2025-12-01 at 4.00.30 PM.png | 300]]
![[Screenshot 2025-12-01 at 4.01.12 PM.png | 70]]
![[Screenshot 2025-12-01 at 4.03.18 PM.png | 50]]
</grid>

 

<small>

We allowed our inference VM to fetch tiles dynamically. When the external server 404'd, 403'd, or timed out, the model ran inference on **black/empty tiles**.

*   **Verify Inputs First:** Never let expensive GPUs run on unvalidated data.
*   **Pre-download & Stitch:** Ensure all assets are valid on disk before spinning up inference.
*   **Cost Implication:** We burned compute credits processing "nothingness."

</small>

---

## Remedies & Scaling Strategy

<small>

To overcome these bottlenecks, we pivoted our approach:

1.  **Proof of Concept:** Successfully ran the model on a single block in Brooklyn to validate the pipeline.
2.  **Controlled Expansion:** Expanded to a specific bounding box in Brooklyn, capping raw file sizes to ~1GB.
3.  **Cloud Orchestration:** Created batch jobs to process large areas in parallel.

</small>

---

## Current Status & Cost

**The Good:**
We have a working pipeline, finished inference on all of our data, and a functional frontend.

**The Bad (The Cost):**
If we made a mistake it'll be pricey.
*   **Inference Cost:** ~$4.00 per year of data processed.
*   **Time:** ~40 minutes runtime per year. (all of brooklyn takes about 3 hours)

---

## Frontend Challenges: Scaling Logic

<small>

With a small dataset, everything was fine. With full Brooklyn data:
*   **RAM Constraints:** Browser memory spikes when loading 2GB+ GeoJSON files.
*   **Render Lag:** Mapbox GL struggles with thousands of dynamic vectors.

**Solution:**
1. Looking for ways to simplify geometry to ensure smooth 60FPS interaction on the slider.
2. Figuring out whether we can store the data in a more performant database that's not just a big js array

</small>

---

Our React application is designed for analysis, not just viewing.
<grid >

</grid>
<small>

**Core Capabilities:**
1.  **Temporal Slider:** Smooth transition between 2014, 2016, and 2018.
2.  **Change Summary:** Real-time diffing (Added vs. Removed vs. Unchanged segments).
3.  **Metrics Dashboard:** Charts visualizing net growth in infrastructure length.
4.  **Validation Dashboard:** Runs validation of model outputs vs accepted data.

</small>

![[Screenshot 2025-12-01 at 7.26.41 PM.png | 150]]

---

## Planned Changes for Final Report

<small>

1.  **Performance:** Figure out a way to replace raw GeoJSON, solving the RAM crash issue.
2.  **Control:** Add user defined controls for spatial tolerance parameters in the UI.
3.  **Control pt2:** Drag and drop shapefiles that take stuff from user.

</small>

---

## Conclusion

We built the machine.
Now we need to tweak it.

By solving the data engineering bottlenecks and validating our inputs, the **Urban Time Traveler** is ready to process the full historical archive and provide concrete answers to our research questions on urban evolution.