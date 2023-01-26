# retail-shoes-app


A fun to implement small shop with rich UX interactions written in React Native. 

The user should be able to select from a variety of different brands which are highlighted via marketing titles (e.g Featured, New).

To make this more challenging, neat ScrollView animations and custom page transititions are included, using the Animated API on the basic containers.

Rotation and Scaling transformations were added to the product cards (also on the product images). The effects are created while scrolling horizontally using custom interpolations.

The custom transition from the main products page to the product details page consists in translating the select product image from the frist page to it's fixed location on the second page while navigating.
This was achieved by measuring the initial position of the image (when tapped on), showing and translating it in a fake view while navigating and finally hiding it when the navigation is done.

Demo

https://user-images.githubusercontent.com/37213839/154836547-6e7f6b4d-9580-4e45-900c-04fcb17fb386.mp4
