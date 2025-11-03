1. Use an algorithm to detect bounding boxes and object classes.
2. Run Kalman Filters to predict the future location of the detected objects.
	1. Assumes linear velocity model and generates predictions according to it.
3. Deep algorithm for telling if the objects we are looking at are the same.
4. IoU matching to detect bounding boxes that should not be there.
	1. Use hungarian algorithm to do $\mathcal{O}(n^{3})$


![[Architecture.excalidraw]]