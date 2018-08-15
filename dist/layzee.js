/**
 * Lazyee
 * A plain js lazy image loader
 *
 * @see https://github.com/woodscreative/layzee
 */
var Layzee = {};
/**
 * Configuration
 */
Layzee.config = {
  'isEnabled' : true,
  'imagesEnabled' : true,
  'classLoading' : 'layzee--is-loading',
  'classComplete' : 'layzee--is-complete'
};
/**
 * Initialise
 *
 * @param object $config the optional config to merge
 */
Layzee.init = function($config)
{
  // Merge configs
  this.config = this._mergeObjects(this.config, $config);
  if (!this.config.isEnabled)
  {
    return;
  };
  var p = this;
  // Find lazyee elements
  var els = document.querySelectorAll("[data-layzee]");
  for (var i=0; i<els.length ;i++)
  {
    // Image element
    var el = els[i];
    // Image src
    var imageSrc = el.getAttribute("data-layzee");
    switch (el.tagName.toLowerCase())
    {
      // Handle <other> elements by applying as inline style background image
      default:
        this._backgroundHandler(el, imageSrc);
      break;
      // Handle <img> element(s)
      case 'img':
        this._imageHandler(el, imageSrc);
      break;
    };
  };
};
/**
 * Load image in background handler
 *
 * @param object $el the dom element
 * @param string $img the image url
 */
Layzee._backgroundHandler = function($el, $img)
{
  var that = this;
  if (this.config.imagesEnabled)
  {
    $el.style.backgroundImage = "url(" + $img + ")";
    $el.classList.add(this.config.classLoading);
    // Preload image by storing it as an arbitrary property
    $el.preloadImage = new Image();
    // Create reference to parent inside image object
    $el.preloadImage.p = $el;
    // Image onload handler
    $el.preloadImage.onload = function()
    {
      $el.classList.remove(that.config.classLoading);
      $el.classList.add(that.config.classComplete);
    };
    $el.preloadImage.src = $img;  
  }
};
/**
 * Load image handler
 *
 * @param object $el the dom element
 * @param string $img the image url
 */
Layzee._imageHandler = function($el, $img)
{ 
  var that = this;
  $el.classList.add(this.config.classLoading);
  if (this.config.imagesEnabled)
  {
    // Image loaded event handler (before src)
    $el.onload = function()
    {
      this.classList.remove(that.config.classLoading);
      this.classList.add(that.config.classComplete);
    };
    $el.src = $img;
  };
};
/**
 * Merge objects
 *
 * @param object $default the default object
 * @param object $defined the defined object
 * @return object $merged
 */
Layzee._mergeObjects = function($default, $defined)
{
	var merged = {}; var prop;
	for (prop in $default)
	{
		if (Object.prototype.hasOwnProperty.call($default, prop))
		{
			merged[prop] = $default[prop];
		};
	};
	for (prop in $defined)
	{
		if (Object.prototype.hasOwnProperty.call($defined, prop))
		{
			merged[prop] = $defined[prop];
		};
	};
	return merged;
};
Layzee.init({
  // Initialise with optional config options...
});