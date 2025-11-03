# Key components

1.  **Detector (YOLO)**
    - Per frame → bounding boxes ($(x_1,y_1,x_2,y_2)$), class (e.g., *person*, *ball*), confidence.
    - NMS removes duplicate boxes.

2.  **Appearance encoder (Re-ID CNN)**
    - Crops each detection and outputs a fixed-length embedding (feature vector).
    - Each track keeps a small gallery of recent embeddings (e.g., last 50–100) for similarity checks.

3.  **Motion model (Kalman filter per track)**
    - Predicts the next bounding box; fuses it with a matched detection to refine the estimate.
    - State used in DeepSORT (constant-velocity box model):
        $$x=\big[c_x, c_y, a, h, \dot c_x, \dot c_y, \dot a, \dot h\big]^T$$
    - where $(c_x,c_y)$ is box center, $a$ aspect ratio, $h$ height.

4.  **Gating**
    - Uses Mahalanobis distance between a detection and a track’s predicted state to discard geometrically impossible matches before assignment.

5.  **Cost construction + matching cascade**
    - For each feasible (track, detection) pair:
        - **Appearance cost**: $c_{\text{app}} = 1-\cos(\text{embed}*\text{track},\text{embed}*\text{det})$
        - **Motion/geometry cost**: e.g., Mahalanobis distance or $1-\text{IoU}$
        - **Blended cost**: $C=\lambda c_{\text{app}} + (1-\lambda) c_{\text{motion}}$
    - **Cascade**: match recently updated, confirmed tracks first; then older/tentative ones.

6.  **Assignment (Hungarian algorithm)**
    - Solves the one-to-one assignment that minimizes total cost across tracks and detections.

7.  **Track management**
    - **Matched tracks**: Kalman update, append embedding, reset `time_since_update`.
    - **Unmatched detections**: start tentative tracks; promote to confirmed after $n_\text{init}$ consecutive matches.
    - **Unmatched tracks**: only predict; delete if not updated for `max_age` frames.

# Kalman Filter

**Linear, discrete, constant-velocity model**

State transition:
$$x_k = F x_{k-1} + w_{k-1},\quad w\sim\mathcal N(0,Q)$$
Measurement (we observe only box geometry):
$$z_k = H x_k + v_k,\quad v\sim\mathcal N(0,R),\quad z_k=[c_x,c_y,a,h]^T$$

**Prediction**
$$\hat x_k = F x_{k-1},\qquad \hat P_k = F P_{k-1} F^\top + Q$$

**Innovation covariance**
$$S_k = H \hat P_k H^\top + R$$

**Kalman gain**
$$K_k = \hat P_k H^\top S_k^{-1}$$

**Update (if a detection is assigned)**
$$x_k = \hat x_k + K_k\big(z_k - H\hat x_k\big),\qquad P_k = (I - K_k H)\hat P_k$$

**Gating (before assignment)**
$$d^2 = (z_k - H\hat x_k)^\top S_k^{-1}(z_k - H\hat x_k)$$
Reject the pair if $d^2$ exceeds a $\chi^2$ threshold.

# Hungarian Algorithm

- We have $m$ existing tracks and $n$ detections; after gating we have an $m \times n$ cost matrix $C$ where $C_{ij}$ is the blended cost for assigning detection $j$ to track $i$.
- The Hungarian algorithm finds the minimum-total-cost set of one-to-one assignments (some tracks or detections may remain unmatched if costs or gating say so).
- Runtime is $O(\max(m,n)^3)$ and it globally optimizes the matching, avoiding greedy mistakes (e.g., choosing a locally “cheap” pair that blocks a much better overall configuration).