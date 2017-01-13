[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/eiwos/eiwos-widgets/master/LICENCE)
# eiwos-widgets

This elements was created for helping to using the [eiwos standard](https://beartek.pw/eiwos/)

## Installation

```
 bower install eiwos/eiwos-widgets
```

## Usage

Import the package elements:
```
<link rel="import" href="bower_components/eiwos-widgets/iframe-widget.html">
```
### In the widget
If FIWA library is not loaded:
```
<init-fiwa-client></init-fiwa-client>
```
And that's it, in the future there will be more elements for the widget.

### In the master page (container)
If FIWA library is not loaded:
```
<init-fiwa></init-fiwa>
```

**For display a normal widget:**
```
<widget id="" width="" height="" src="" perms="" force_origin="" thumbnail="" backcolor="" backimage=""></widget>
```
| Parameter      | meaning           | required? |
| :------------- | :---------------- |:--------- |
| id             | unique identifier | yes       |
| width          | width of widget   | yes       |
| height         | height of widget  | yes       |
| src            | source url of widget | yes    |
| perms          | perms of widget. [info](http://www.w3schools.com/tags/att_iframe_sandbox.asp) | no       |
| force_origin   | force widget to not change the url | no       |
| thumbnail      | image that shows when widget is loading | no  |
| backcolor      | color for widget background | no       |
| backimage      | image for widget background  | no      |
___
**For display a full-screen widget:**
```
<widget-full id="" width="" height="" src="" perms="" force_origin="" thumbnail="" backcolor="" backimage=""></widget-full>
```
| Parameter      | meaning           | required? |
| :------------- | :---------------- |:--------- |
| id             | unique identifier | yes       |
| width          | width of widget   | yes       |
| height         | height of widget  | yes       |
| src            | source url of widget | yes    |
| perms          | perms of widget. [info](http://www.w3schools.com/tags/att_iframe_sandbox.asp) | no       |
| force_origin   | force widget to not change the url | no       |
| thumbnail      | image that shows when widget is loading | no  |
| backcolor      | color for widget background | no       |
| backimage      | image for widget background  | no      |

And that's it.
## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
