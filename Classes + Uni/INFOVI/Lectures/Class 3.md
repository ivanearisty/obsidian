---
tags:
  - INFOVI
---
## Color
Monotonically increasing luminance color maps are a better idea to use.

Color channel interactions:
- Size heavily influences salience
- small regions need high saturation and large regions low saturation
- since the maps are large areas we use low saturation (left) and high saturation for roads since they are thin.
Saturation luminence:
- Not seperable from each other
- Dont encode data in both saturation and luminence
- They are also indistinguishable from transparency
https://colorbrewer2.org/#type=sequential&scheme=BuGn&n=3

### Luminance
- We need luminance for edge detection
- Fine grained details only visible via luminence contrast
- Legible test requires luminence contrast
![[Screenshot 2024-09-26 at 12.15.49 PM.jpg]]

Colorblind -> degreaded acuity along one axis: ![[Screenshot 2024-09-26 at 12.16.13 PM.jpg]]

Essentially reduing color to 2 dimensions.

Avoid encoding information only using hue since you will fall into colorblind situations.
- Vary luminance and change shape

Blue orange is pretty safe.

### Color Spaces

All colors available to you are the color space.
![[Screenshot 2024-09-26 at 12.35.19 PM.jpg]]

The hex-code is technically gibberish since it doesn't intuitively tell you anything.


