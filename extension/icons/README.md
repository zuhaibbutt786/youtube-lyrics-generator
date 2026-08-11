# Icons

Place your extension icons here:

- icon16.png
- icon48.png
- icon128.png

Simple red placeholders can be generated with ImageMagick:

```bash
convert -size 16x16 xc:'#ff0033' -fill white -gravity center -pointsize 10 -annotate 0 'L' icon16.png
convert -size 48x48 xc:'#ff0033' -fill white -gravity center -pointsize 28 -annotate 0 'L' icon48.png
convert -size 128x128 xc:'#ff0033' -fill white -gravity center -pointsize 72 -annotate 0 'L' icon128.png
```
