Focus on finding good "why" questions. Like, something is this way -> explain why.

## object detection metrics
### Average Precision
What does this number represent? The area under the curve of what?
### Mean Average Precision

## object detectors


### RCNN

$$
\begin{gather}
g = (V,E) : \\ 
E \text{ is similarity metric to group pixels together based on a treshld comparison} \\
V \text{ the pixels}
\end{gather}
$$

region proposals say that behind a region there is an object.

we're trying to build labels for classification task

1. box the segments after heirarchical grouping to create the proposals
2. extraction of features / proposal.  fit the proposals into a cnn (pretrained on imagenet for example) with a clasification head
3. fine tune the network to classify region proposals into k+1 classes. (where +1 is the background)
4. Use IoU to filter proposals as (threshold 0.5):
	1. a positive taht belongs to one of the k classes
	2. b negative that have IoU < threshold, these are belonging to the background class
	- cross entropy is used for training with softmax
Basically we want to be able to 


### Faster RCNN
### Faster RCNN (two stage)

###  Yolo v12 (single stage)
dont focus too much of this

