This is an ambitious and technically rich project involving Computer Vision (CV), GIS (Geographic Information Systems), and Data Visualization. To achieve the goals outlined in your "Urban Time Traveler" proposal, you need to execute a pipeline that moves from raw aerial imagery to a polished interactive dashboard.

Here is a step-by-step technical roadmap to achieving this, aligned with your timeline.

---

### Phase 1: Environment & Data Acquisition (Week 1)

**1. Hardware Setup (Crucial)**
*   **GPU Access:** `Tile2Net` is a PyTorch-based deep learning model. You cannot run this efficiently on a CPU.
    *   *Options:* Use NYU High Performance Computing (HPC) resources (Greene cluster), Google Colab Pro+, or a local machine with a strong NVIDIA GPU (RTX 3060 or better).
*   **Storage:** Aerial imagery (orthophotos) for the whole of Brooklyn across 6 different years will be massive (hundreds of GBs). Ensure you have adequate external storage or cloud bucket space.

**2. Data Inventory (NYC Open Data)**
*   **Imagery:** Download "NYC Planimetrics" or "Orthophotos" for 2014, 2016, 2018, 2020, 2022, and 2024.
    *   *Note:* You will likely need to download these as "tiles" (GeoTIFFs). You need a script to filter only the tiles that intersect with the Brooklyn borough boundary (use a Brooklyn Shapefile to mask/clip).
*   **Ground Truth:** Download the "NYC Sidewalks" shapefile and "Vision Zero" crash data.

**3. The Baseline Assessment (The "Credibility Check")**
*   Before processing all years, run `Tile2Net` on a small slice of 2024 data.
*   **Validation Logic:**
    *   Load `Tile2Net` output (polygons) and Official NYC Sidewalks (polygons) into `Geopandas`.
    *   Use `geopandas.overlay(how='intersection')` to find the overlapping area (True Positives).
    *   Calculate Precision/Recall/F1 based on area overlap.
    *   *Tip:* Use a small buffer (e.g., 0.5m) around the official sidewalks to account for slight GPS misalignment in the aerial imagery.

---

### Phase 2: The Extraction Pipeline (Weeks 2-3)

**1. Running Tile2Net**
*   You are performing **Inference**, not training (unless the pre-trained model fails specific Brooklyn textures).
*   **Pipeline:** Input Image Tile $\rightarrow$ Segmentation (U-Net/HRNet) $\rightarrow$ Polygonization $\rightarrow$ Centerline Extraction $\rightarrow$ Graph Topology.
*   **Batch Processing:** Write a Python script to loop through your years. Do not process the whole borough at once; process neighborhood by neighborhood (e.g., Community Districts) to prevent memory crashes.

**2. Addressing "Image Registration" Issues**
*   *The Challenge:* The camera angle in 2014 might be slightly different from 2016. A sidewalk might appear to move 1 meter to the left, looking like a "change" when it isn't.
*   *The Fix:* When comparing Year A to Year B, align the images first, or use "fuzzy matching" in your vector analysis (e.g., "If a sidewalk exists within 2 meters of the previous year's sidewalk, treat it as unchanged").

---

### Phase 3: Analysis & Metrics (Week 4)

**1. Network Topology (Graph Theory)**
*   Use **OSMnx** or **NetworkX** in Python.
*   Convert your extracted centerlines into a graph ($G = (V, E)$).
*   **Calculate Metrics:**
    *   *Density:* Total edge length / Area of neighborhood.
    *   *Connectivity:* Intersection count (nodes with degree $\ge$ 3).
    *   *Walkability:* Average shortest path length.

**2. The "Diff" Logic**
*   You need to detect **Added** vs. **Removed** vs. **Modified**.
*   **Spatial Difference:**
    *   $Added = Geom_{2016} - Buffer(Geom_{2014})$
    *   $Removed = Geom_{2014} - Buffer(Geom_{2016})$
*   *Clean up:* Filter out "micro-changes" (e.g., fragments smaller than 5 meters) to avoid visual noise.

**3. Contextual Correlation**
*   Load Vision Zero data. Perform a "Spatial Join" (`sjoin`) to count crashes within 50m of newly added crosswalks vs. unchanged areas.

---

### Phase 4: Visualization (Weeks 4-5)

**1. The Tech Stack**
*   **Backend:** Python (Pandas/Geopandas).
*   **Frontend:** Since you need a slider and interactivity, **Streamlit** or **Plotly Dash** are the fastest ways to build this without writing raw HTML/JS.
*   **Map Component:** Use **Kepler.gl** (embedded in Python) or **Mapbox**. They handle large geospatial datasets much better than standard Matplotlib.

**2. The Dashboard Design**
*   **Main View:** A map of Brooklyn.
*   **Controls:** A slider [2014 .... 2024].
*   **Visual Encoding:**
    *   Grey: Unchanged infrastructure.
    *   Green: New infrastructure (since previous timestep).
    *   Red: Removed infrastructure.
*   **Side Panel:** Line charts showing "Total Sidewalk Miles" over time.

---

### Checklist for Success

1.  **Clip your data early:** Do not try to process water, buildings, or New Jersey. Clip everything to the Brooklyn land boundary immediately.
2.  **Handle Shadows:** Aerial imagery often has shadows that confuse ML models. If `Tile2Net` struggles in shady areas, you may need to post-process using the "Road" layer as a guide (sidewalks usually parallel roads).
3.  **Focus on the "Story":** The metrics are cool, but the visual "Diff" is the "wow" factor. Make sure the green/red highlights on the map pop.