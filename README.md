
# Layzee

A plain js lazy image loader. Load `Layzee` at the end of your document before the closing `</body>` tag.

```
<script src="dist/layzee.js"></script>
```

## Markup

When applied to `<img>` elements it will update the `src` attribute.

```
<img data-layzee="http://via.placeholder.com/720x720">
```

If the `data-layzee` attribute is applied to other elements, an inline style is created `background-image:url('');` on that element. Example: 

```
<li data-layzee="http://via.placeholder.com/720x720">
</li>
```

## Parameters

| Name                   | Type   | Default              | Description                                  |
| :--------------------- | :----- | :------------------- | :------------------------------------------- |
| isEnabled              | bool   | true                 | if false, layzee is disabled                 |
| imagesEnabled          | bool   | true                 | if false, images will not be loaded          |
| classLoading           | string | layzee--is-loading   | the class applied while loading              |
| classComplete          | string | layzee--is-complete  | the class applied when load is complete      |