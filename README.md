# D3 Matrix Visualization Library

This is a D3 based matrix visualization that is heavily inspired by the awesome
R package [corrplot](http://cran.r-project.org/web/packages/corrplot/index.html)

It is still in very preliminary stage and many aspects of the design might change
in future releases.

## How to use

To install
```
bower install saurfang/d3-corrplot
```

For more information, please see the example in doc.

## Animation

The animation can be visually smooth only if they are drawn using path with the same number of points.
One fine example is the [Superformula](http://bl.ocks.org/mbostock/1020902) where you can create
a lot of interesting shapes just by tweaking the parameters.

However I have observed that using too many points can lead to a degenerating performance for a large
matrix. So the choice of using finely segmentized path is up to you. If you don't include Superformula
script, the base implementation of square and circle only just minimal points/arcs.


## Notes

This is based on the Javascript library template [lib-tmpl](https://github.com/jeremyckahn/lib-tmpl).
I greatly appreciate this gives me a good place to start with my work. However I'm still familiarizing
with the concepts of this template and not confident I have put things in their best places. On a related
note, you might noticed I have left a lot of sample code in just to help me remember the possibilities
using them in the future.

The D3 part is encapsulated using [d3.chart](http://misoproject.com/d3-chart/). Again this is a great library
but I'm still figuring it out.

As always, suggestions and pull requests are greatly appreciated.


## Related Work

[lib-tmpl](https://github.com/jeremyckahn/lib-tmpl)
[d3.chart](http://misoproject.com/d3-chart/)
[Superformula](http://bl.ocks.org/mbostock/1020902)
[corrplot](http://cran.r-project.org/web/packages/corrplot/index.html)
[corrgram](http://cran.r-project.org/web/packages/corrgram/index.html)
[A Graphical Display of Large Correlation Matrices](http://www.jstor.org/stable/2684435)